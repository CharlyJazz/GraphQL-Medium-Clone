class Resolvers::EditPost < GraphQL::Function
  argument :id, !types.ID
  argument :title, types.String
  argument :body, types.String
  argument :picture, types.String
  argument :topicId, types.ID

  type Types::PostType

  description "Edit title, body, picture and / or the topic of a Post"

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    post = Post.find(args[:id])

    if post.user_id == ctx[:current_user].id
      post.update_attributes({
          body: args[:body],
          title: args[:title],
          picture: args[:picture]
      })

      if args[:topicId]
        post.update(topic: Topic.find(args[:topicId]))
      end
    else
      raise GraphQL::ExecutionError.new("You do not have the necessary permissions to edit this post")
    end

    post

  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
