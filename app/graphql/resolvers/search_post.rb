class Resolvers::SearchPost < GraphQL::Function
  argument :id, types.ID

  type Types::PostType

  def call(_obj, args, ctx)
    Post.find(args[:id])
  rescue ActiveRecord::RecordNotFound => e
      GraphQL::ExecutionError.new("Post with the id #{args[:id]} not found")
  end
end