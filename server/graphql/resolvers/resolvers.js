// import codeSchema from '../../models/codeSchema'
import commandsSchema from '../../models/commandsSchema'
// import { find, filter } from 'lodash'
// import { pubsub } from './subscriptions'

const resolveFunctions = {
  Query: {
    /*codes () {
     return codeSchema.find({}).exec()
     },
     */
    commands () {
      console.log('llego aqui ? ')
      // return commandsSchema.find({}).exec() // 58f2a89a2463a62024505ecd
    },
    command (root, arg, context) {
      if (arg.id) {
        return commandsSchema.findById(arg.id)
          .then((data) => {
          console.log('----')
            console.log(data)
            return data
          }).catch((error) => {
            return error
          })
      } else {
        return null
      }
    }
  },
  Mutation: {
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
    }
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

export default resolveFunctions
