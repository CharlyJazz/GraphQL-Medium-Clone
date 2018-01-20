Types::AuthProviderInput = GraphQL::InputObjectType.define do
  name 'Auth_Provider_InputType'

  argument :email, !types.String
  argument :password, !types.String
end