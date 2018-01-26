Types::UserType = GraphQL::ObjectType.define do
  name 'User'
  description 'User of the appication'

  field :id, !types.ID
  field :name, !types.String
  field :email, !types.String
  field :picture, types.String

  field :claps_posts, -> { !types[Types::ClapType] }
  field :comments, -> { !types[Types::CommentType] }
  field :posts, -> { !types[Types::PostType] }
  field :collections, -> { !types[Types::CollectionType] }
end