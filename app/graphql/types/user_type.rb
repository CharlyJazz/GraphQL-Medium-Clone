Types::UserType = GraphQL::ObjectType.define do
  name 'User'
  description 'User of the appication'

  field :id, !types.ID
  field :username, !types.String
  field :email, !types.String
  field :last_name, !types.String
  field :first_name, !types.String
  field :bio, types.String
  field :picture, types.String

  field :claps, types[Types::ClapType] do
    argument :last, types.Int
    resolve -> (obj, args, ctx) {
      if args.key? :last
        obj.claps.last(args[:last])
      else
        obj.claps.last 25
      end 
    }
  end

  field :comments, types[Types::CommentType] do
    argument :last, types.Int
    resolve -> (obj, args, ctx) {
      if args.key? :last
        obj.comments.last(args[:last])
      else
        obj.comments.last 25
      end 
    }
  end
  
  field :posts, types[Types::PostType] do
    argument :last, types.Int
    resolve -> (obj, args, ctx) {
      if args.key? :last
        obj.posts.last(args[:last])
      else
        obj.posts.last 25
      end 
    }
  end

  field :collections, types[Types::CollectionType] do
    argument :last, types.Int
    resolve -> (obj, args, ctx) {
      if args.key? :last
        obj.collections.last(args[:last])
      else
        obj.collections.last 25
      end
    }
  end

  field :bookmarks, types[Types::BookmarkType] do
    argument :last, types.Int
    resolve -> (obj, args, ctx) {
      if args.key? :last
        obj.bookmarks.last(args[:last])
      else
        obj.bookmarks.last 25
      end 
    }
  end

  field :count, Types::UserCountType do
    argument :resources, !types[types.String]
    description 'Count a resource of the User as Posts, Claps, Collections'
    resolve -> (obj, args, ctx) {
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
            GraphQL::ExecutionError.new(
              "User dont have a relationship with #{x}"
            )
        end
      end

      OpenStruct.new(Hash[resources.map { |x| [x, countCase(x, obj)] }])
    }
  end
end