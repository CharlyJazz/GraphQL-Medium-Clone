class Resolvers::AddOrRemoveTagsToPost < GraphQL::Function
  argument :postId, !types.ID
  argument :idTagsToAdd, types[types.Int]
  argument :idTagsToRemove, types[types.Int]

  type Types::PostType

  description "Add or Remove Tags to a Post usings the Tags ids"

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    begin
      post = Post.find(args[:postId])
    rescue ActiveRecord::RecordNotFound => e
      return GraphQL::ExecutionError.new("Post with the id #{args[:postId]} not found")
    end

    if post.user_id == ctx[:current_user].id
      args[:idTagsToRemove] && !args[:idTagsToRemove].empty? && post.tags.delete(args[:idTagsToRemove].map { |n| Tag.find(n)})
      args[:idTagsToAdd] && !args[:idTagsToAdd].empty? && args[:idTagsToAdd].each { |n| post.tags << Tag.find(n)}
    else
      raise GraphQL::ExecutionError.new("You do not have the necessary permissions to edit this post")
    end

    post

  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end

end
