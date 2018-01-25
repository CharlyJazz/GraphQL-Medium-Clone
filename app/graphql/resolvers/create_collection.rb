class Resolvers::CreateCollection < GraphQL::Function
  argument :title, !types.String
  argument :description, !types.String
  argument :picture, !types.String
  
  argument :postsId, types[types.Int]

  type Types::CollectionType

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    collection = Collection.create!(
      title: args[:title],
      description: args[:description],
      picture: args[:picture],
      user: ctx[:current_user]
    )

    !args[:postsId].blank? && args[:postsId].each {|postId|
      begin
        collection.posts << Post.find(postId)
      rescue ActiveRecord::RecordNotFound
        return GraphQL::ExecutionError.new("Post with the id #{postId} not found")
      end
    }

    collection

  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end