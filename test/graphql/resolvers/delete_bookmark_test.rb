require 'test_helper'

class Resolvers::DeleteBookmarkTest < ActiveSupport::TestCase
  setup do
    @bookmark = create(:bookmark)

    @user = create(:user)
  end

  def perform_owner_success(
    args = {
      id: @bookmark.id
    },
    ctx = {
      current_user: User.find(@bookmark.user_id)
    }
  )
    Resolvers::DeleteBookmark.new.call(nil, args, ctx)
  end

  def perform_guest_error(args = {id: @bookmark.id}, ctx={})
    Resolvers::DeleteBookmark.new.call(nil, args, ctx)
  end

  def perform_not_owner_error(
    args = {
      id: @bookmark.id
    },
    ctx = {
      current_user: User.find(@user.id)
    }
  )
    Resolvers::DeleteBookmark.new.call(nil, args, ctx)
  end
  
  test 'owner auth user delete a bookmark with success' do
    assert_equal Bookmark.count, 1
    assert_equal User.count, 3

    perform = perform_owner_success()

    assert_equal perform.message, 'Bookmark successfully removed'
    assert_equal Bookmark.count, 0
    assert_equal User.count, 3
  end

  test 'guest user delete a bookmark with error' do
    assert_equal Bookmark.count, 1
    assert_equal User.count, 3

    exception = assert_raises(GraphQL::ExecutionError) { perform_guest_error() }
    assert_equal(exception.message, "Authentication required")

    assert_equal Bookmark.count, 1
    assert_equal User.count, 3
  end

  test 'auth user try delete a bookmark with different user id' do
    assert_equal Bookmark.count, 1
    assert_equal User.count, 3

    exception = assert_raises(GraphQL::ExecutionError) { perform_not_owner_error() }
    assert_equal(exception.message, "You do not have the necessary permissions to delete this bookmark")

    assert_equal Bookmark.count, 1
    assert_equal User.count, 3
  end
end