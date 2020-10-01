Types::RecoverPasswordPayloadType = GraphQL::ObjectType.define do
  name 'Recover_Password_Payload'
  description 'Message about the recovery of the password'

  field :message, !types.String
end
