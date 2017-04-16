import commandsMutation from './commandsMutation'
import codesMutation from './codesMutation'
let stringMutation = ''

stringMutation += commandsMutation
stringMutation += codesMutation

const mutation = `
type Mutation {
${stringMutation}
}
`

//console.log('-------llllllllllllllllllllllllllll')
//console.log(mutation)
export default mutation
