class Resolvers::CreateUser < GraphQL::Function
  argument :name, !types.String
  argument :credentials, Types::AuthProviderInput

  type Types::UserType

  def call(_obj, args, _ctx)
    User.create!(
      name: args[:name],
      email: args[:credentials][:email],
      password: args[:credentials][:password]
    )
  rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end