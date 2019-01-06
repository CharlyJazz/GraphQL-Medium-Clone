class Resolvers::EditCollection < GraphQL::Function
  argument :id, !types.ID
  argument :title, types.String
  argument :description, types.String
  argument :picture, types.String

  type Types::CollectionType

  description "Edit title, description and / or the picture of a Collection"

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    collection = Collection.find(args[:id])

    if collection.user_id == ctx[:current_user].id
      collection.update_attributes({
          title: args[:title],
          description: args[:description],
          picture: args[:picture]
      })

      if args[:topicId]
        collection.update(topic: Topic.find(args[:topicId]))
      end
    else
      raise GraphQL::ExecutionError.new("You do not have the necessary permissions to edit this collection")
    end

    collection

  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
