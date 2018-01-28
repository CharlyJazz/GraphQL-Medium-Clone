Types::SearchQueryType = GraphQL::ObjectType.define do
  field :allPosts, function: Resolvers::SearchPosts
  field :allCollections, function: Resolvers::SearchCollections
  field :allUsers, function: Resolvers::SearchUsers
  field :allTags, function: Resolvers::SearchTags
end