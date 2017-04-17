const projectsSchema = `
  type Projects {
    id: String
    name: String
    description: String
    subProjects:[SubProjects]
  }
`

export default projectsSchema
