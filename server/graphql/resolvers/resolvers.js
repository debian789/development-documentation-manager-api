//import codesSchema from '../../models/codesSchema'
//import commandsSchema from '../../models/commandsSchema'
import commandsQuery from './query/commandsQuery'
import codesQuery from './query/codesQuery'

import codesMutation from './mutation/codesMutation'
import commandsMutation from './mutation/commandsMutation'

// var mongoose = require('mongoose')

// import { find, filter } from 'lodash'
// import { pubsub } from './subscriptions'

const resolveFunctions = {
  Query: {
    /*codes () {
     return codesSchema.find({}).exec()
     }
     ,
     commands () {
     console.log('llego aqui ? ')
     return commandsSchema.find({}).exec() // 58f2a89a2463a62024505ecd
     },
     command (root, arg, context) {
     if (arg.id && mongoose.Types.ObjectId.isValid(arg.id)) {
     return commandsSchema.findById(arg.id)
     .then((data) => {
     return data
     }).catch((error) => {
     return error
     })
     } else {
     return new Error('Id invalid')
     }
     }*/
  },
  Mutation: {
    /*
     addCommand (_, {tag, description, subCommand}) {
     return commandsSchema.create({tag: tag, description: description, subCommand: subCommand}, (err, data) => {
     if (err) {
     console.log(err)
     return err
     } else {
     console.log(data)
     return data
     }
     })
     },
     addCode (_, {title, description, code}) {
     return codesSchema.create({title, description, code}, (err, data) => {
     if (err) {
     return err
     } else {
     return data
     }
     })
     }*/
  }

  /*Mutation: {
   upvotePost(_, { postId }) {
   const post = find(posts, { id: postId });
   if (!post) {
   throw new Error(`Couldn't find post with id ${postId}`);
   }
   post.votes += 1;
   pubsub.publish('postUpvoted', post);
   return post;
   },
   },
   Subscription: {
   postUpvoted(post) {
   return post;
   },
   },*/
  /*Comment: {
   postId(comment) {
   return blogPostSchema.findById({ _id: comment.postId }).exec();
   },
   },
   Post: {
   comment(post) {
   return commentSchema.find({postId: post.id}).exec();
   },
   }*/
}

resolveFunctions.Query.command = commandsQuery.command
resolveFunctions.Query.commands = commandsQuery.commands
resolveFunctions.Query.codes = codesQuery.codes

resolveFunctions.Mutation.addCode = codesMutation.addCode
resolveFunctions.Mutation.addCommand = commandsMutation.addCommand

export default resolveFunctions
