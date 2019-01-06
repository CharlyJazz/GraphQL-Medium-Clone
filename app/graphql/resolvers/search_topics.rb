class Resolvers::SearchTopics < GraphQL::Function
  type !types[Types::TopicType]

  description "Get all topics"

  def call(_, _, _)
    Topic.all
  end
end
