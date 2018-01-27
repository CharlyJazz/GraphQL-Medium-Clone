Types::PostType = GraphQL::ObjectType.define do
  name 'Post'
  description 'Post of User'

  field :id, !types.ID
  field :title, !types.String
  field :body, !types.String
  field :picture, !types.String

  field :postedBy, -> { Types::UserType }, property: :user
  field :claps, -> { !types[Types::ClapType] }
  field :tags, -> { !types[Types::TagType] }
  field :collections, -> { !types[Types::CollectionType] }
end