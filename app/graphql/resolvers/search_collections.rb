require 'search_object/plugin/graphql'

class Resolvers::SearchCollections
    # include SearchObject for GraphQL
    include SearchObject.module(:graphql)
    # scope is starting point for search
    scope { Collection.all }
    # return type
    type !types[Types::CollectionType]
    # inline input type definition for the advance filter
    CollectionFilter = GraphQL::InputObjectType.define do
      name 'CollectionFilter'

      argument :OR, -> { types[CollectionFilter] }
      argument :title_contains, types.String
      argument :description_contains, types.String
    end
    # when "filter" is passed "apply_filter" would be called to narrow the scope
    option :filter, type: CollectionFilter, with: :apply_filter
    # apply_filter recursively loops through "OR" branches
    def apply_filter(scope, value)
      # normalize filters from nested OR structure, to flat scope list
      branches = normalize_filters(value).reduce { |a, b| a.or(b) }
      scope.merge branches
    end

    def normalize_filters(value, branches = [])
      # add like SQL conditions
      scope = Post.all
      scope = scope.where('title LIKE ?', "%#{value['title_contains']}%") if value['title_contains']
      scope = scope.where('description LIKE ?', "%#{value['description_contains']}%") if value['description_contains']
  
      branches << scope
  
      # continue to normalize down
      value['OR'].reduce(branches) { |s, v| normalize_filters(v, s) } if value['OR'].present?
  
      branches
    end
end