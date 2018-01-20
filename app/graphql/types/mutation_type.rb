Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"
 
  field :createUser, function: Resolvers::CreateUser.new
  field :signInUser, function: Resolvers::SignInUser.new
  field :createPost, function: Resolvers::CreatePost.new
end
