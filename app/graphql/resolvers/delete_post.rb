class Resolvers::DeletePost < GraphQL::Function
  argument :id, !types.ID

  type Types::MessagePayloadType

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    post = Post.find(args[:id])

    if post.user_id == ctx[:current_user].id
      post.destroy
    else
      raise GraphQL::ExecutionError.new("You do not have the necessary permissions to delete this post")
    end

    OpenStruct.new(message: 'Post successfully removed')
    
  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end