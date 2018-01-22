require 'test_helper'

class Resolvers::CreateBookmarkTest < ActiveSupport::TestCase
  setup do
    create(:post)
  end

  def perform(args = {}, ctx = {current_user: User.find(1)})
    Resolvers::CreateBookmark.new.call(nil, args, ctx)
  end

  test 'creating bookmark with auth' do
    bookmark = perform(
      postId: "1"
    )

    assert bookmark.persisted?
    assert_equal bookmark.id, 1
    assert_equal Bookmark.count, 1
  end
end