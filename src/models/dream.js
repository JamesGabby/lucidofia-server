const mongoose = require('mongoose')

const Dream = mongoose.model('Dream', {
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    emotionsAndFeelings: {
        type: String,
        required: false,
        trim: true
    },
    wasLucid : {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Dream