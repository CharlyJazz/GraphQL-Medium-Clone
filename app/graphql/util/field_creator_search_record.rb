module Util
  class FieldCreatorSearchRecord

    def initialize(models_and_types)
      # models_and_types should Array of Arrays with only elements:
      # [[Post, PostType], [User, UserType], [Category, CategoryType]] 
      @models_and_types = models_and_types
    end

    def create_fields
      unless @models_and_types.blank?
        hash_of_fields = {}
        @models_and_types.each { |array|
          # model = array[0] 
          # type  = array[1]
          # extra arguments = array[2]
          name_field = GraphQL::Field.define do # Create field without the helper field
            name "search#{array[0].model_name}"
            description "Search a #{array[0].model_name} with the id"
            type array[1]
            argument :id, types.ID
            array[2] && array[2].each { |arg, type|
              case type
                when 'String'
                  argument arg, types.String
                when 'Int'
                  argument arg, types.Int
                when 'ID'
                  argument arg, types.ID
                else
                  GraphQL::ExecutionError.new("The type #{type} no exist or not supported")
              end
            }
            resolve -> (_, args, _) {
              # Check if search for an argument that is not the id
              if array.length == 3
                array[2].each {  |arg, _|
                  if args.key?(arg.to_sym)
                    begin
                      return array[0].where(arg.to_sym => args[arg.to_sym]).first!
                    rescue ActiveRecord::RecordNotFound => e
                      return GraphQL::ExecutionError.new(
                        "#{array[0].model_name} with the #{arg} #{args[arg.to_sym]} not found"
                      )
                    end
                  end
                }
              end
              begin
                array[0].find(args[:id])
              rescue ActiveRecord::RecordNotFound => e
                GraphQL::ExecutionError.new(
                  "#{array[0].model_name} with the id #{args[:id]} not found"
                )
              end
            }
          end
          # Create name of the field for the hash key
          # Add key: name of the field and value: GraphQL::Field instance
          hash_of_fields["search#{array[0].model_name}".to_sym] = name_field
        }

        return GraphQL::ObjectType.new.tap do |root_type|
          root_type.fields = hash_of_fields
        end
      end
    end
  end
end
