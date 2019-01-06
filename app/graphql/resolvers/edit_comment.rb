class Resolvers::EditComment < GraphQL::Function
  argument :id, !types.ID
  argument :body, !types.String

  type Types::CommentType

  description "Edit the body of a Comment"

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    comment = Comment.find(args[:id])

    if comment.user_id == ctx[:current_user].id
      comment.update(body: args[:body])
    else
      raise GraphQL::ExecutionError.new("You do not have the necessary permissions to edit this comment")
    end

    comment

  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
