Types::TopicType = GraphQL::ObjectType.define do
  name 'Topic'
  description 'The Topics are useful to catalog each post and create smart searches'

  field :id, !types.ID
  field :name, !types.String
  field :description, !types.String
  field :picture, !types.String
  field :posts, -> { types[Types::PostType] }
end
