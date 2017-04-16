/*import { makeExecutableSchema } from 'graphql-tools'
import resolvers from '../resolvers/resolvers'
console.log('llego aqui')
const schema = `
type subCommand {
  id: String
  command: String!
  description: String
}

input subCommandInput {
  command: String!
  description: String
}

type Commands {
  id: String # the ! means that every author object _must_ have an id
  tag: String
  #postId: Post
  subCommand: [subCommand]
}

type Codes {
  id: String
  title: String
  votes: Int
  #Commands: [Commands]
}

# the schema allows the following query:
type Query {
  commands: [Commands]
 # comment(id: String): Comment
  codes: [Codes]
}

# this schema allows the following mutation:
#type Mutation {
#  upvotePost (
#    postId: Int!
#  ): Post
#}

type Mutation {
  addCommand (
    tag: String!
    description: String!
    subCommand: [subCommandInput] 
  ): Commands
}

#type Subscription {
#  postUpvoted: Post
#}

`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
*/
