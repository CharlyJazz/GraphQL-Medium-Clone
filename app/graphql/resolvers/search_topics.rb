class Resolvers::SearchTopics < GraphQL::Function
  type !types[Types::TopicType]

  def call(_, _, _)
    Topic.all
  end
end