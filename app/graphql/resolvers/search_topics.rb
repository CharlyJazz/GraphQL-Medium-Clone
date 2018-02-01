class Resolvers::SearchTopics < GraphQL::Function
  type [Types::TopicType]

  def call(_, _, _)
    Topic.all
  end
end