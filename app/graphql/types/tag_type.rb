Types::TagType = GraphQL::ObjectType.define do
  name 'Tag'
  description 'Tag in a Post'

  field :id, !types.ID
  field :name, !types.String
  field :description, !types.String
end