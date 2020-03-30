import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './graphql/schema'

const app = express()

const apollo = new ApolloServer({
    schema
})

apollo.applyMiddleware({ app, cors: false });

export default app
