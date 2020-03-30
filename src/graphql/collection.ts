import { gql } from 'apollo-server-express'
import Item from '../entity/Item'

export const typeDefs = gql`
    type Collection {
        id: ID!
        name: String
        items: [Item]
        created_at: Date
    }

    extend type Query {
        collections: [Collection]
    }

    extend type Mutation {
        createCollection(
            name: String
        ): Collection
    }
`

export const resolvers = {
    Query: {
        collections: async () => {

        }
    },
    Mutation: {
        createCollection: async (_:any, args: any) => {

        }
    }
}