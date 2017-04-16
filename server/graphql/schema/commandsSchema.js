const commandsSchema = `
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
`
export default commandsSchema
