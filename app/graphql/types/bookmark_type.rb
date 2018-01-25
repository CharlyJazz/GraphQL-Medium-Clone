Types::BookmarkType = GraphQL::ObjectType.define do
  name 'Bookmark'
  description 'Bookmark of Post to read later'

  field :id, types.ID
  field :user, -> { Types::UserType }
  field :post, -> { Types::PostType }
end