import commandsMutation from './commandsMutation'
let stringMutation = ''

stringMutation += commandsMutation

const mutation = `
type Mutation {
${stringMutation}
}
`

//console.log('-------llllllllllllllllllllllllllll')
//console.log(mutation)
export default mutation
