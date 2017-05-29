const commandsMutation = `
  addCommand (
    tag: String!
    description: String!
    subCommand: [subCommandInput] 
  ): Commands
  
  updateCommand (
    id: String!
    tag: String!
    subCommand: [subCommandInput]
  ): Commands
  
  removeCommand (
    id: String!
  ): Commands
`
export default commandsMutation
