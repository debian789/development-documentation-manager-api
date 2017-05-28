const codesMutation = `
  addCode (
    title: String!
    description: String
    code: String!
  ): Codes
  
  updateCode (
    id: String!
    title: String!
    description: String
    code: String!
  ): Codes
  
  removeCode (
    id: String!
  ): Codes
`
export default codesMutation
