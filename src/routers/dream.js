const express = require('express')
const Dream = require('../models/dream')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/dreams', auth, async (req, res) => {
    const dream = new Dream({
        ...req.body, // Spreads the key-value pairs from req.body
        owner: req.user._id
    })

    try {
        await dream.save()
        res.status(201).send(dream)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/dreams', auth, async (req, res) => {
    try {
        const dreams = await Dream.find({ owner: req.user._id })
        res.send(dreams)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/dreams/:id', auth, async (req, res) => {
    const _id = req.params.id
    
    try {
        // const Dream = await Dream.findById(_id)
        const dream = await Dream.findOne({ _id, owner: req.user._id })

        if (!dream) {
            res.status(404)
        }

        res.send(dream)
    } catch (e) { 
        res.status(500).send()
    }
})

router.patch('/dreams/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body) // Coverts object to array of properties
    const allowedUpdates = ['title', 'description', 'wasLucid']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const dream = await Dream.findOne({ _id: req.params.id, owner: req.user._id })

        if (!dream) {
            return res.status(404).send()
        }
        
        updates.forEach((update) => dream[update] = req.body[update])
        await dream.save()
        res.send(dream)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/dreams/:id', auth, async (req, res) => {
    try {
        const dream = await Dream.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!dream) {
            res.status(404).send()
        }

        res.send(dream)
    } catch (e) {
        res.status(500).send()
    } 
})

module.exports = router