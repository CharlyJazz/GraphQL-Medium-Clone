Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  
  field :searchPost, function: Resolvers::SearchPost.new, description: 'Search a Post with the id'
end
