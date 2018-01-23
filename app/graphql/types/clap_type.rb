Types::ClapType = GraphQL::ObjectType.define do
  name 'Clap'

  field :id, types.ID
  field :total, !types.Int
  field :user, -> { Types::UserType }
  field :post, -> { Types::PostType }
end