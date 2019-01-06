class Resolvers::CreateBookmark < GraphQL::Function
  argument :postId, !types.ID

  type Types::BookmarkType

  description "Create a bookmark to save a post to read later"

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    Bookmark.create!(
      post: Post.find_by(id: args[:postId]),
      user: ctx[:current_user]
    )

  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
