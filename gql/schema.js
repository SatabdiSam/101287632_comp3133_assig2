const { gql } = require('apollo-server-express')

const typeDefs = gql `
    type User {
        id: ID!
        username: String!
        firstname: String!
        lastname: String!
        password: String!
        email: String!
        type: String!
    }

    type Listing {
        id: ID!
        listing_id: String!
        listing_title: String!
        description: String!
        street: String!
        city: String!
        postal_code: String!
        price: Float!
        email: String!
        username: String!
    }

    type Booking {
        id: ID!
        listing_id: String!
        booking_id: String!
        booking_date: String!
        booking_start: String!
        booking_end: String!
        username: String!
    }

    type Query {
        getListings: [Listing]
        getListingsByName(name: String!): [Listing]
        getListingsByCity(city: String!): [Listing]
        getListingsByPosCode(postal_code: String!): [Listing]
        getBookingsByUser(userId: String!): [Booking]
        getListingsByAdmin(userId: String!): [Listing]
    }

    type Mutation {
        addUser(username: String!
            firstname: String!
            lastname: String!
            password: String!
            email: String!
            type: String!): User

        login(username: String!
            password: String!): [String]

        addListing(userId: String!
            listing_id: String!
            listing_title: String!
            description: String!
            street: String!
            city: String!
            postal_code: String!
            price: Float!): Listing

        addBooking(userId: String!
            listing_id: String!
            booking_id: String!
            booking_date: String!
            booking_start: String!
            booking_end: String!): Booking
    }
`

module.exports = typeDefs