Types::UserCountType = GraphQL::ObjectType.define do
  name 'UserCountType'
  description 'Counts resources of a User'

  field :posts, types.Int
  field :collections, types.Int
  field :claps, types.Int
  field :comments, types.Int
  field :bookmarks, types.Int
end