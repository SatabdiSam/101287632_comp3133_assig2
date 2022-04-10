const mongoose = require('mongoose')

let ListingSchema = new mongoose.Schema({

    listing_id: {
        type: String,
        required: [true, 'List ID is required.'],
        unique: [true, 'List ID must be unique.']
    },
    listing_title: {
        type: String,
        required: [true, 'List Title is required.'],
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        maxlength: [1000, 'Description max length: 1000 characters.']
    },
    street: {
        type: String,
        required: [true, 'Street is required.'],
        lowercase: true
    },
    city: {
        type: String,
        required: [true, 'City is required.'],
        lowercase: true
    },
    postal_code: {
        type: String,
        required: [true, 'Postal code is required.'],
        lowercase: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    }

})

let Listing = mongoose.model('Listing', ListingSchema)
module.exports = Listing