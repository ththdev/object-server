import { gql, ApolloError } from 'apollo-server-express'
import { getRepository } from 'typeorm'
import User from '../entity/User'

export const typeDefs = gql`
    type User {
        id: ID!
        name: String
        email: String
        gender: String
        created_at: Date
    }

    extend type Query {
        users: [User]
    }

    extend type Mutation {
        register(name: String!, email: String!, gender: String!): Boolean
        editUser(id: ID!, name: String, email: String, gender: String): User
        deleteUser(id: ID): Boolean
    }
`

export const resolvers = {
    Query: {
        users: async () => {
            const userRepo = getRepository(User);
            const users = await userRepo.find()

            return users
        }
    },
    Mutation: {
        register: async (_:any, args: any) => {
            const { name, email, gender } = args;
            const userRepo = getRepository(User);
            
            // Email duplicate check
            const exist = await userRepo.findOne({ email })
            if (exist) throw new ApolloError('Already exist email');

            const newUser = new User();
            newUser.name = name;
            newUser.email = email
            newUser.gender = gender

            await userRepo.save(newUser);
            return true
        },
        editUser: async(_:any, args: any) => {
            const { id, name, email, gender } = args;
            const userRepo = getRepository(User);
            const user = await userRepo.findOne(id);
            if(!user) throw new ApolloError('Could not find user');

            user.name = name
            user.email = email
            user.gender = gender

            await userRepo.save(user)
            const updatedUser = await userRepo.findOne(id)
            return updatedUser
        },
        deleteUser: async (_:any, args: any) => {
            const { id } = args;
            const userRepo = getRepository(User)
            const user = await userRepo.findOne(id)

            if (!user) throw new ApolloError('Could not find user')

            await userRepo.remove(user);
            return true 
        }
    }
}