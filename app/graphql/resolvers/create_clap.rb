class Resolvers::CreateClap < GraphQL::Function
  argument :postId, types.ID
  argument :totalClaps, types.Int

  type Types::ClapType

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    # Search Post or rescue
    begin
      post = Post.find(args[:postId])
    rescue ActiveRecord::RecordNotFound => e
      return GraphQL::ExecutionError.new("Post with the id #{args[:postId]} not found")
    end
    
    # Check if current_user have claps in the post
    clap = post.claps.where(:user_id => ctx[:current_user].id).first
    
    if clap.blank?
      clap = Clap.new(
        user: ctx[:current_user],
        total: args[:totalClaps]
      )
      post.claps << clap
      post.save
    else
      clap.total += args[:totalClaps]
      clap.save
    end

    clap
    
  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end