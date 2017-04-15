import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const schema = `
type Commands {
  id: String # the ! means that every author object _must_ have an id
  text: String
  #postId: Post
 
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

#type Subscription {
#  postUpvoted: Post
#}

`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
