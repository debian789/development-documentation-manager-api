import commandsMutation from './commandsMutation'
import codesMutation from './codesMutation'
import projectsMutation from './projectsMutation'
import subProjectsMutation from './subProjectsMutation'

let stringMutation = ''

stringMutation += commandsMutation
stringMutation += codesMutation
stringMutation += projectsMutation
stringMutation += subProjectsMutation

const mutation = `
type Mutation {
${stringMutation}
}
`
export default mutation
