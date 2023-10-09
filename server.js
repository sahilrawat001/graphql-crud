
 const express  = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server');
const { default: mongoose } = require('mongoose');
const url = "mongodb://localhost:27017/abc";
const schema = require('./graphql2');

const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers
});
  mongoose.connect(url).then(() => {
    console.log(" connected")
} );
server.listen({port: 8000}).then(({url}) => console.log(`Server running at ${url}`));