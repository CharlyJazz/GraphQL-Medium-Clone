Types::PostType = GraphQL::ObjectType.define do
  name 'Post'

  field :id, !types.ID
  field :title, !types.String
  field :body, !types.String
  field :picture, !types.String

  field :postedBy, -> { Types::UserType }, property: :user
end