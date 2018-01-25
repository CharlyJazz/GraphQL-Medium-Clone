Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"
 
  field :createUser, function: Resolvers::CreateUser.new
  field :signInUser, function: Resolvers::SignInUser.new
  field :createPost, function: Resolvers::CreatePost.new
  field :createComment, function: Resolvers::CreateComment.new
  field :createBookmark, function: Resolvers::CreateBookmark.new
  field :createClap, function: Resolvers::CreateClap.new
  field :createCollection, function: Resolvers::CreateCollection.new
end
