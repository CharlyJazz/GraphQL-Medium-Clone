class Resolvers::RefreshPassword < GraphQL::Function
  argument :email, !types.String
  argument :password, !types.String
  argument :token, !types.String

  type Types::RecoverPasswordPayloadType

  description "Update password"

  def call(_obj, args, ctx)
    # Raise an exception if no user is present

    user = User.find_by(email: args[:email], token: args[:token])

    if !user.nil? && user.is_token_valid?
      user.reset_password! args[:password]
      AuthenticationMailer.updated_password_response(user).deliver_now
      OpenStruct.new(message: 'Password updated')
    else
      OpenStruct.new(message: 'Password not updated')
    end

  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
