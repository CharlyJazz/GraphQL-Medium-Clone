Types::BookmarkType = GraphQL::ObjectType.define do
  name 'Bookmark'

  field :id, types.ID
  field :user, -> { Types::UserType }
  field :post, -> { Types::PostType }
end