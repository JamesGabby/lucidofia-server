const mongoose = require('mongoose')

const Dream = mongoose.model('Dream', {
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
        type: Boolean
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Dream