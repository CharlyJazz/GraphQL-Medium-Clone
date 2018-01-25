Types::CollectionType = GraphQL::ObjectType.define do
  name 'Collection'
  description 'Collection of several Posts'

  field :id, !types.ID
  field :title, !types.String
  field :description, !types.String
  field :picture, !types.String
  field :posts, -> { types[Types::PostType] }
  field :postedBy, -> { Types::UserType }, property: :user
end
