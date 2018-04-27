require 'test_helper'

class Resolvers::DeleteCommentTest < ActiveSupport::TestCase
  setup do
    @comment = create(:comment)

    @user = create(:user)
  end

  def perform_owner_success(
    args = {
      id: @comment.id
    },
    ctx = {
      current_user: User.find(@comment.user_id)
    }
  )
    Resolvers::DeleteComment.new.call(nil, args, ctx)
  end

  def perform_guest_error(args = {id: @comment.id}, ctx={})
    Resolvers::DeleteComment.new.call(nil, args, ctx)
  end

  def perform_not_owner_error(
    args = {
      id: @comment.id
    },
    ctx = {
      current_user: User.find(@user.id)
    }
  )
    Resolvers::DeleteComment.new.call(nil, args, ctx)
  end
  
  test 'owner auth user delete a comment with success' do
    assert_equal Comment.count, 1
    assert_equal User.count, 3

    perform = perform_owner_success()

    assert_equal perform.message, 'Comment successfully removed'
    assert_equal Comment.count, 0
    assert_equal User.count, 3
  end

  test 'guest user delete a comment with error' do
    assert_equal Comment.count, 1
    assert_equal User.count, 3

    exception = assert_raises(GraphQL::ExecutionError) { perform_guest_error() }
    assert_equal(exception.message, "Authentication required")

    assert_equal Comment.count, 1
    assert_equal User.count, 3
  end

  test 'auth user try delete a comment with different user id' do
    assert_equal Comment.count, 1
    assert_equal User.count, 3

    exception = assert_raises(GraphQL::ExecutionError) { perform_not_owner_error() }
    assert_equal(exception.message, "You do not have the necessary permissions to delete this comment")

    assert_equal Comment.count, 1
    assert_equal User.count, 3
  end
end