Types::AuthProviderInput = GraphQL::InputObjectType.define do
  name 'Auth_Provider_InputType'
  description 'Credentials for sign in or sing up'
  
  argument :email, !types.String
  argument :password, !types.String
end