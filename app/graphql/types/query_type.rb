Types::QueryType = GraphQL::ObjectType.new.tap do |root_type|
  root_type.name = "Query"
  root_type.description = "The query root of this schema"
  root_type.interfaces = []
  root_type.fields = Util::FieldCombiner.combine([
    Types::SearchQueryType,

    Util::FieldCreatorSearchRecord.new([
      [Post, Types::PostType],
      [User, Types::UserType],
      [Collection, Types::CollectionType],
      [Bookmark, Types::BookmarkType],
      [Comment, Types::CommentType]
    ]).create_fields
  ])
end