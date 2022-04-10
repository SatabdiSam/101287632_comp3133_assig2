const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')

const TypeDefs = require('./gql/schema.js')
const Resolvers = require('./gql/resolvers.js')

const db = 'mongodb+srv://sssangma:BTShoe123456@cluster0.kp2hx.mongodb.net/101287632_comp3133_assig1?retryWrites=true&w=majority'
const port = process.env.PORT || 8000

// MongoDB Connection
mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true})
const connect = mongoose.connection
connect.once('open', () => {
    console.log('SUCCESS - MongoDB connection established.');
});
connect.on('error', (err) => {
    console.log("FAILED - MongoDB connection error. " + err);
    process.exit();
});

// Apollo Server
const server = new ApolloServer({
    typeDefs: TypeDefs,
    resolvers: Resolvers
})

const app = express()
app.use(bodyParser.json())

server.start()
.then(res => {
    server.applyMiddleware({app})
    // Start Server
    app.listen(port, () => {
        console.log(`Server at http://localhost:${port}${server.graphqlPath}`)
    })
})