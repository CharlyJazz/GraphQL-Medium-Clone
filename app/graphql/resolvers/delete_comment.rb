class Resolvers::DeleteComment < GraphQL::Function
  argument :id, !types.ID

  type Types::MessagePayloadType

  description "Delete a Comment forever"

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    comment = Comment.find(args[:id])

    if comment.user_id == ctx[:current_user].id
      comment.destroy
    else
      raise GraphQL::ExecutionError.new("You do not have the necessary permissions to delete this comment")
    end

    OpenStruct.new(message: 'Comment successfully removed')

  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
