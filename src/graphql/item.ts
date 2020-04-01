import { gql, ApolloError } from 'apollo-server-express'
import { getRepository } from 'typeorm'
import Item from '../entity/Item'
import User from '../entity/User'

export const typeDefs = gql`
    type Item {
        id: ID!
        name: String!
        price: Int!
        brand: String
        imageUrls: [String]
        creator_id: ID!
        created_at: Date
    }

    scalar Date

    type Query {
        items: [Item]
    }

    type Mutation {
        createItem(
            name: String!
            price: Int
            brand: String
            imageUrls: [String]
            creator_id: ID!
        ): Item
        editItem(
            name: String!
            price: Int
            brand: String
            imageUrls: [String]
            creator_id: ID!
        ): Item
        deleteItem(
            id: ID!
            creator_id: ID!
        ): Boolean
    }
`

export const resolvers = {
    Query: {
        items: async () => {
            const itemRepo = getRepository(Item)
            const items = itemRepo.find()

            return items
        }
    },
    Mutation: {
        createItem: async (_:any, args: any) => {
            const { name, price, brand, imageUrls, creator_id } = args;
            const itemRepo = getRepository(Item)
            
            const newItem = new Item()
            newItem.name = name
            newItem.price = price
            newItem.brand = brand
            newItem.imageUrls = imageUrls
            newItem.creator_id = creator_id

            await itemRepo.save(newItem)

            return newItem
        },
        editItem: async (_: any, args: any) => {
            const { id, name, price, brand, imageUrls, creator_id } = args;
            const itemRepo = getRepository(Item)
            const item = await itemRepo.findOne(id)

            if (!item) throw new ApolloError('Could not find item');
            if (item.creator_id !== creator_id) throw new ApolloError('You are not creator');

            item.name = name
            item.price = price
            item.brand = brand
            item.imageUrls = imageUrls

            await itemRepo.save(item);
            const updatedItem = await itemRepo.findOne(id)

            return updatedItem
        },
        deleteItem: async (_:any, args: any) => {
            const { id, creator_id } = args;
            const itemRepo = getRepository(Item)
            const item = await itemRepo.findOne(id)

            if (!item) throw new ApolloError('Could not find item');
            if (item.creator_id !== creator_id) throw new ApolloError('You are not creator');

            await itemRepo.remove(item)

            return true 
        }
    }
}