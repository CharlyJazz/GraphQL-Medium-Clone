Types::SignInPayloadType = GraphQL::ObjectType.define do
  name 'Sign_In_Payload'
  description 'Payload of SignInUser Mutation'

  field :token, types.String
  field :user, Types::UserType
end