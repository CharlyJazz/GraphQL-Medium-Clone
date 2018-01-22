class Resolvers::CreateComment < GraphQL::Function
  argument :postId, types.ID
  argument :body, !types.String

  type Types::CommentType

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    Comment.create!(
      body: args[:body],
      post: Post.find_by(id: args[:postId] ),
      user: ctx[:current_user]
    )

  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end