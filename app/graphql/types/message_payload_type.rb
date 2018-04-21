Types::MessagePayloadType = GraphQL::ObjectType.define do
  name 'Message_Payload_Type'
  description 'Payload message of any success mutation'

  field :message, types.String
end