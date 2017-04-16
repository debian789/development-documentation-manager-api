const codesSchema = `
input CodesInput {
  title: String!
  description: String
  code: String!
}

type Codes {
  id: String # the ! means that every author object _must_ have an id
  title: String
  description: String
  code: String!
}
`
export default codesSchema
