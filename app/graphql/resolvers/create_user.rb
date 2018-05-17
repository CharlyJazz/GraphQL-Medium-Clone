class Resolvers::CreateUser < GraphQL::Function
  argument :username, !types.String
  argument :last_name, !types.String
  argument :first_name, !types.String
  argument :bio, types.String
  argument :picture, types.String
  argument :credentials, Types::AuthProviderInput

  type Types::UserType

  def call(_obj, args, _ctx)
    User.create!(
      username: args[:username],
      last_name: args[:last_name],
      first_name: args[:first_name],
      bio: args[:bio],
      picture: args[:picture],
      email: args[:credentials][:email],
      password: args[:credentials][:password]
    )
  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end