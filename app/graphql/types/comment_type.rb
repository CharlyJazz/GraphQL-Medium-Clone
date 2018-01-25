Types::CommentType = GraphQL::ObjectType.define do
  name 'Comment'
  description 'Comment in a Post'

  field :id, types.ID
  field :body, !types.String

  field :post, -> { Types::PostType }
  field :postedBy, -> { Types::UserType }, property: :user
end