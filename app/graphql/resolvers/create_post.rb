class Resolvers::CreatePost < GraphQL::Function
  argument :title, !types.String
  argument :body, !types.String
  argument :picture, !types.String
  argument :topicId, !types.ID
  argument :tagsId, types[types.ID]

  type Types::PostType

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    post = Post.create!(
      body: args[:body],
      title: args[:title],
      picture: args[:picture],
      topic: Topic.find(args[:topicId]),
      user: ctx[:current_user],
    )

    !args[:tagsId].blank? && args[:tagsId].each {|tagId|
      begin
        post.tags << Tag.find(tagId)
      rescue ActiveRecord::RecordNotFound
        return GraphQL::ExecutionError.new("Tag with the id #{tagId} not found")
      end
    }

    post

  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end