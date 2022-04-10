const mongoose = require('mongoose')

let BookingSchema = new mongoose.Schema({

    listing_id: {
        type: String,
        required: [true, 'List ID is required.']
    },
    booking_id: {
        type: String,
        required: [true, 'Booking ID is required.']
    },
    booking_date: {
        type: String,
        required: [true, 'Booking date created is required.']
    },
    booking_start: {
        type: String,
        required: [true, 'Booking start date is required.']
    },
    booking_end: {
        type: String,
        required: [true, 'Booking end date is required.']
    },
    username: {
        type: String,
        required: [true, 'Username is required.']
    }

})

let Booking = mongoose.model('Booking', BookingSchema)
module.exports = Booking