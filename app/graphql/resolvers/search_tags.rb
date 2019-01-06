require 'search_object/plugin/graphql'

class Resolvers::SearchTags
    # include SearchObject for GraphQL
    include SearchObject.module(:graphql)
    # scope is starting point for search
    scope { Tag.all }
    # return type
    type !types[Types::TagType]
    # description
    description "Search Engine for Tags using OR"
    # inline input type definition for the advance filter
    TagFilter = GraphQL::InputObjectType.define do
      name 'TagFilter'

      argument :OR, -> { types[TagFilter] }
      argument :name_contains, types.String
    end
    # when "filter" is passed "apply_filter" would be called to narrow the scope
    option :filter, type: TagFilter, with: :apply_filter
    # apply_filter recursively loops through "OR" branches
    def apply_filter(scope, value)
      # normalize filters from nested OR structure, to flat scope list
      branches = normalize_filters(value).reduce { |a, b| a.or(b) }
      scope.merge branches
    end

    def normalize_filters(value, branches = [])
      # add like SQL conditions
      scope = Tag.all
      scope = scope.where('name LIKE ?', "%#{value['name_contains']}%") if value['name_contains']

      branches << scope

      # continue to normalize down
      value['OR'].reduce(branches) { |s, v| normalize_filters(v, s) } if value['OR'].present?

      branches
    end
end
