const User = require('../db/models/user.js')
const Listing = require('../db/models/listing.js')
const Booking = require('../db/models/booking.js')

const resolvers = {
    Query: {
        getListings: async (parents, args) => {
            return await Listing.find({})
        },
        getListingsByName: async (parents, args) => {
            return await Listing.find({ listing_title: { $regex: args.name, $options: 'i' } })
        },
        getListingsByCity: async (parents, args) => {
            return await Listing.find({ city: args.city })
        },
        getListingsByPosCode: async (parents, args) => {
            return await Listing.find({ postal_code: { $regex: args.postal_code, $options: 'i' } })
        },
        getBookingsByUser: async (parents, args) => {
            
            // Check if userId was passed
            if (!args.userId) {
                return
            }

            const userFind = await User.findById(args.userId)

            // Check if user was found
            if (!userFind) {
                return
            }
            
            // Returns all bookings by User
            return await Booking.find({ username: userFind.username })
        },
        getListingsByAdmin: async (parents, args) => {

            // Check if userId was passed
            if (!args.userId) {
                return
            }

            const userFind = await User.findById(args.userId)

            // Check if user was found
            if (!userFind) {
                return
            }

            // Check if user is admin
            if (userFind.type != 'admin') {
                return
            }

            // Return all listings by Admin
            return await Listing.find({ username: userFind.username })
        }
    },

    Mutation: {

        addUser: async (parent, args) => {

            let tempUser = new User({
                username: args.username,
                firstname: args.firstname,
                lastname: args.lastname,
                password: args.password,
                email: args.email,
                type: args.type
            })

            return await tempUser.save()
        },

        login: async (parent, args) => {
            const userFind = await User.findOne({username: args.username})

            if (!userFind) {
                return
            }

            if (userFind.password != args.password) {
                return
            }

            return [
                userFind._id, 
                userFind.username, 
                userFind.firstname,
                userFind.lastname,
                userFind.email,
                userFind.type
            ]
        },

        addListing: async (parent, args) => {

            // Check if userId was passed
            if (!args.userId) {
                return
            }

            const userFind = await User.findById(args.userId)

            // Check if user was found
            if (!userFind) {
                return
            }

            // Check if user is admin
            if (userFind.type != 'admin') {
                return
            }

            let tempListing = new Listing({
                listing_id: args.listing_id,
                listing_title: args.listing_title,
                description: args.description,
                street: args.street,
                city: args.city,
                postal_code: args.postal_code,
                price: args.price,
                email: userFind.email,
                username: userFind.username
            })

            return await tempListing.save()
        },

        addBooking: async (parent, args) => {

            // Check if userId was passed
            if (!args.userId) {
                return
            }
            
            if (!args.listing_id) {
                return
            }

            const userFind = await User.findById(args.userId)

            // Check if user was found
            if (!userFind) {
                return
            }

            let tempBooking = new Booking({
                listing_id: args.listing_id,
                booking_id: args.booking_id,
                booking_date: new Date().toString(),
                booking_start: new Date(args.booking_start).toString(),
                booking_end: new Date(args.booking_end).toString(),
                username: userFind.username
            })

            return await tempBooking.save()
        }
    }
}

module.exports = resolvers