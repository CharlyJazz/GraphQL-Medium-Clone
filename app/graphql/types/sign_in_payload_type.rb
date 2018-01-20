Types::SignInPayloadType = GraphQL::ObjectType.define do
  name 'Sign_In_Payload'

  field :token, types.String
  field :user, Types::UserType
end