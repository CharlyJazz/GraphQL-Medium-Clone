class Resolvers::SignInUser < GraphQL::Function
  argument :credentials, Types::AuthProviderInput

  type Types::SignInPayloadType

  description "Authenticate a user using the email and password and get a token"

  def call(_obj, args, _ctx)
    input = args[:credentials]

    return unless input

    user = User.find_by email: input[:email]

    return unless user
    return unless user.authenticate(input[:password])

    OpenStruct.new(user: user, token: AuthToken.token(user))
  end
end
