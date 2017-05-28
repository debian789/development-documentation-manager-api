import { makeExecutableSchema } from 'graphql-tools'
import schema from './schema'
import mutation from './mutation'
import resolvers from './resolvers'

let typeDefs = ``

typeDefs += schema
typeDefs += mutation

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers
})
