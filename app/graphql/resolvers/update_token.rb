class Resolvers::UpdateToken < GraphQL::Function
  argument :email, !types.String

  type Types::RecoverPasswordPayloadType

  description "Update token to recover password using your email"

  def call(_obj, args, ctx)
    # Raise an exception if no user is present

    user = User.find_by(email: args[:email])

    if !user.nil?
      user.generate_token!
      AuthenticationMailer.recover_password_response(user).deliver_now
      OpenStruct.new(message: 'We have sent you an email')
    else
      OpenStruct.new(message: 'Invalid email')
    end

  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
