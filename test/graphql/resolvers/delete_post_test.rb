require 'test_helper'

class Resolvers::DeletePostTest < ActiveSupport::TestCase
  setup do
    @post = create(:post)

    @user = create(:user)
  end

  def perform_owner_success(
    args = {
      id: @post.id
    },
    ctx = {
      current_user: User.find(@post.user_id)
    }
  )
    Resolvers::DeletePost.new.call(nil, args, ctx)
  end

  def perform_guest_error(args = {id: @post.id}, ctx={})
    Resolvers::DeletePost.new.call(nil, args, ctx)
  end

  def perform_not_owner_error(
    args = {
      id: @post.id
    },
    ctx = {
      current_user: User.find(@user.id)
    }
  )
    Resolvers::DeletePost.new.call(nil, args, ctx)
  end


  test 'owner auth user delete a post with success' do
    assert_equal Post.count, 1
    assert_equal User.count, 2

    perform = perform_owner_success()

    assert_equal perform.message, 'Post successfully removed'
    assert_equal Post.count, 0
    assert_equal User.count, 2
  end

  test 'guest user delete a post with error' do
    assert_equal Post.count, 1
    assert_equal User.count, 2

    exception = assert_raises(GraphQL::ExecutionError) { perform_guest_error() }
    assert_equal(exception.message, "Authentication required")

    assert_equal Post.count, 1
    assert_equal User.count, 2
  end

  test 'auth user try delete a post with different user id' do
    assert_equal Post.count, 1
    assert_equal User.count, 2

    exception = assert_raises(GraphQL::ExecutionError) { perform_not_owner_error() }
    assert_equal(exception.message, "You do not have the necessary permissions to delete this post")

    assert_equal Post.count, 1
    assert_equal User.count, 2
  end
end