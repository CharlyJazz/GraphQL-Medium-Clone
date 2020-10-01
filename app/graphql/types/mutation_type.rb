Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"
  # fields for create resources
  field :createUser, function: Resolvers::CreateUser.new
  field :signInUser, function: Resolvers::SignInUser.new
  field :createPost, function: Resolvers::CreatePost.new
  field :createComment, function: Resolvers::CreateComment.new
  field :createBookmark, function: Resolvers::CreateBookmark.new
  field :createClap, function: Resolvers::CreateClap.new
  field :createCollection, function: Resolvers::CreateCollection.new
  # fields for delete resources
  field :deletePost, function: Resolvers::DeletePost.new
  field :deleteComment, function: Resolvers::DeleteComment.new
  field :deleteCollection, function: Resolvers::DeleteCollection.new
  field :deleteBookmark, function: Resolvers::DeleteBookmark.new
  # fields for edit resources
  field :editComment, function: Resolvers::EditComment.new
  field :editPost, function: Resolvers::EditPost.new
  field :editCollection, function: Resolvers::EditCollection.new
  field :addOrRemovePostsToCollection, function: Resolvers::AddOrRemovePostsToCollections.new
  field :addOrRemoveTagsToPost, function: Resolvers::AddOrRemoveTagsToPost.new
  field :updateToken, function: Resolvers::UpdateToken.new
  field :refreshPassword, function: Resolvers::RefreshPassword.new
end
