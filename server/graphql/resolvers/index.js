import commandsQuery from './query/commandsQuery'
import codesQuery from './query/codesQuery'
import projectsQuery from './query/projectsQuery'
import codesMutation from './mutation/codesMutation'
import commandsMutation from './mutation/commandsMutation'
import projectsMutation from './mutation/projectsMutation'

const resolveFunctions = {
  Query: {},
  Mutation: {}
}

resolveFunctions.Query.command = commandsQuery.command
resolveFunctions.Query.commands = commandsQuery.commands

resolveFunctions.Query.codes = codesQuery.codes
resolveFunctions.Query.code = codesQuery.code

resolveFunctions.Query.projects = projectsQuery.projects

resolveFunctions.Mutation.addCode = codesMutation.addCode
resolveFunctions.Mutation.updateCode = codesMutation.updateCode
resolveFunctions.Mutation.removeCode = codesMutation.removeCode
resolveFunctions.Mutation.addCommand = commandsMutation.addCommand

resolveFunctions.Mutation.addProject = projectsMutation.addProject
resolveFunctions.Mutation.updateProject = projectsMutation.updateProject
resolveFunctions.Mutation.removeProject = projectsMutation.removeProject

resolveFunctions.Mutation.addSubProject = projectsMutation.addSubProject

export default resolveFunctions

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
