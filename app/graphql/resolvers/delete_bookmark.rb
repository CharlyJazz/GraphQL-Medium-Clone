class Resolvers::DeleteBookmark < GraphQL::Function
  argument :id, !types.ID

  type Types::MessagePayloadType

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    bookmark = Bookmark.find(args[:id])

    if bookmark.user_id == ctx[:current_user].id
      bookmark.destroy
    else
      raise GraphQL::ExecutionError.new("You do not have the necessary permissions to delete this bookmark")
    end

    OpenStruct.new(message: 'Bookmark successfully removed')
    
  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end