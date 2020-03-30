import { gql } from 'apollo-server-express'
import Item from '../entity/Item'
import Collection from '../entity/Collection'

export const typeDefs = gql`
    type Item {
        id: ID!
        name: String
        price: Int
        brand: String
        imageUrls: [String]
        parentCollection: Collection
        created_at: Date
    }

    scalar Date

    type Query {
        items: [Item]
    }

    type Mutation {
        createItem(
            name: String
            price: Int
            brand: String
            imageUrls: [String]
        ): Item
    }
`

export const resolvers = {
    Query: {
        items: async () => {

        }
    },
    Mutation: {
        createItem: async (_:any, args: any) => {

        }
    }
}