class Resolvers::CreatePost < GraphQL::Function
  argument :title, !types.String
  argument :body, !types.String
  argument :picture, !types.String

  type Types::PostType

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    Post.create!(
      body: args[:body],
      title: args[:title],
      picture: args[:picture],
      user: ctx[:current_user]
    )

  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end