import { find, filter } from 'lodash';
import { pubsub } from './subscriptions';
import codeSchema from '../models/codeSchema'
import commandsSchema from '../models/commandsSchema'

const resolveFunctions = {
  Query: {
    codes() {
      // blogPostSchema.find({}).then((d) => { console.log(d)})
      return codeSchema.find({}).exec();
    },
    commands() {
      //commentSchema.find({}).then((d) => { console.log(d)})
      return commandsSchema.find({}).exec();
    },
  },
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
};

export default resolveFunctions;
