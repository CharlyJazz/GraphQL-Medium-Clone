Types::UserType = GraphQL::ObjectType.define do
  name 'User'
  description 'User of the appication'

  field :id, !types.ID
  field :name, !types.String
  field :email, !types.String
  field :bio, !types.String
  field :picture, types.String

  field :claps_posts, -> { !types[Types::ClapType] }
  field :comments, -> { !types[Types::CommentType] }
  field :posts, -> { !types[Types::PostType] }
  field :collections, -> { !types[Types::CollectionType] }
  field :bookmarks, -> { !types[Types::BookmarkType]}
  field :count, Types::UserCountType do
    argument :resources, !types[types.String]
    description 'Count a resource of the User as Posts, Claps, Collections'
    resolve ->(obj, args, ctx) {
      resources = args[:resources]

      def countCase(field_name, obj)
        case field_name
          when 'posts'
            obj.posts.count
          when 'comments'
            obj.comments.count
          when 'claps'
            obj.claps_posts.sum(:total)
          when 'collections'
            obj.collections.count
          when 'bookmarks'
            obj.bookmarks.count
          else 
            GraphQL::ExecutionError.new("User dont have a relationship with #{x}")
         end
      end

      a = OpenStruct.new(Hash[resources.map {|x| [x, countCase(x, obj)]}])
    }
  end
end