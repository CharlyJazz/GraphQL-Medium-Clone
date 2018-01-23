class Resolvers::CreateClap < GraphQL::Function
  argument :postId, types.ID
  argument :totalClaps, types.Int

  type Types::ClapType

  def call(_obj, args, ctx)
    # Raise an exception if no user is present
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    # Search Post 
    post = Post.find_by(id: args[:postId] )
    # Check if current_user have claps in the post
    check_if_user_have_claps = post.claps.where(:user_id => ctx[:current_user].id).first
    
    if check_if_user_have_claps.blank?
      post.claps << Clap.new(
        user: ctx[:current_user],
        total: args[:totalClaps]
      )
      post.save
    else
      check_if_user_have_claps.total += args[:totalClaps]
      check_if_user_have_claps.save
    end

    OpenStruct.new(totalClaps: post.claps.all.sum(:total))
    
  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end