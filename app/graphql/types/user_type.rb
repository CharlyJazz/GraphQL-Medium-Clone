Types::UserType = GraphQL::ObjectType.define do
  name 'User'
  description 'User of the appication'

  field :id, !types.ID
  field :name, !types.String
  field :email, !types.String
  field :picture, types.String
end