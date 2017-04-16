const commandsMutation = `
  addCommand (
    tag: String!
    description: String!
    subCommand: [subCommandInput] 
  ): Commands
`
export default commandsMutation
