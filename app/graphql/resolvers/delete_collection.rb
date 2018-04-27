class Resolvers::DeleteCollection < GraphQL::Function
  argument :id, !types.ID

  type Types::MessagePayloadType

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    collection = Collection.find(args[:id])

    if collection.user_id == ctx[:current_user].id
      collection.destroy
    else
      raise GraphQL::ExecutionError.new("You do not have the necessary permissions to delete this collection")
    end

    OpenStruct.new(message: 'Collection successfully removed')
    
  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end