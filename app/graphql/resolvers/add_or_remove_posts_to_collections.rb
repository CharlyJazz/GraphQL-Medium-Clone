class Resolvers::AddOrRemovePostsToCollections < GraphQL::Function
  argument :collectionId, !types.ID
  argument :idPostsToRemove, types[types.Int]
  argument :idPostsToAdd, types[types.Int]

  type Types::CollectionType

  description "Add or Remove Posts to a Collection usings the Posts ids"

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    begin
      collection = Collection.find(args[:collectionId])
    rescue ActiveRecord::RecordNotFound => e
      return GraphQL::ExecutionError.new("Collection with the id #{args[:collectionId]} not found")
    end

    if collection.user_id == ctx[:current_user].id
      args[:idPostsToRemove] && !args[:idPostsToRemove].empty? && collection.posts.delete(args[:idPostsToRemove].map { |n| Post.find(n)})
      args[:idPostsToAdd] && !args[:idPostsToAdd].empty? && args[:idPostsToAdd].each { |n| collection.posts << Post.find(n)}
    else
      raise GraphQL::ExecutionError.new("You do not have the necessary permissions to edit this collection")
    end


    collection

  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end

end
