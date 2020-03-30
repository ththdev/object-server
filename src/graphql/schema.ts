import merge from 'lodash/merge'
import { makeExecutableSchema } from 'apollo-server-express'
import * as user from './user'
import * as collection from './collection'
import * as item from './item'

const schema = makeExecutableSchema({
    typeDefs: [item.typeDefs, collection.typeDefs, user.typeDefs],
    resolvers: merge(
        item.resolvers,
        collection.resolvers,
        user.resolvers
    )
});

export default schema