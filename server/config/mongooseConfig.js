'use strict'
import mongoose from 'mongoose'

mongoose.connect(process.env.DB_Conection ? process.env.DB_Conection : 'mongodb://localhost/librarycode')

export default mongoose
