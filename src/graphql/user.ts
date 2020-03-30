import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type User {
        id: ID!
        name: String
        created_at: Date
    }

    extend type Query {
        users: [User]
    }

    extend type Mutation {
        register(
            name: String
        ): User
    }
`

export const resolvers = {
    Query: {
        users: async () => {

        }
    },
    Mutation: {
        register: async (_:any, args: any) => {

        }
    }
}