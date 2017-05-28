const projectsMutation = `
  addProject(
    name: String!
    description: String
  ): Projects
  
  updateProject(
    id: String!
    name: String!
    description: String
  ): Projects
  
  removeProject(
    id: String!
  ): Projects
  
  
`

export default projectsMutation
