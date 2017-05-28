import mongoose from 'mongoose'
let Schema = mongoose.Schema

let subProjectSchema = new Schema({
  title: {type: String, required: true},
  body: {type: String, required: true}
})

export default mongoose.model('SubProjects', subProjectSchema)
