require 'test_helper'

class Resolvers::EditCommentTest < ActiveSupport::TestCase
  setup do
    @comment = create(:comment)

    @user = create(:user)
  end

  def perform_owner_success(
    args = {
      id: @comment.id,
      body: "New body"
    },
    ctx = {
      current_user: User.find(@comment.user_id)
    }
  )
    Resolvers::EditComment.new.call(nil, args, ctx)
  end

  def perform_guest_error(args = {id: @comment.id}, ctx={})
    Resolvers::EditComment.new.call(nil, args, ctx)
  end

  def perform_not_owner_error(
    args = {
      id: @comment.id
    },
    ctx = {
      current_user: User.find(@user.id)
    }
  )
    Resolvers::EditComment.new.call(nil, args, ctx)
  end

  test 'owner auth user edit a comment with success' do
    assert_equal Comment.count, 1
    assert_equal User.count, 3

    perform = perform_owner_success()

    assert perform.persisted?
    assert_equal perform.body, 'New body'
    assert_equal User.count, 3
  end

  test 'guest user edit a comment with error' do
    assert_equal Comment.count, 1
    assert_equal User.count, 3

    exception = assert_raises(GraphQL::ExecutionError) { perform_guest_error() }
    assert_equal(exception.message, "Authentication required")

    assert_equal @comment.body, 'The pet'
    assert_equal User.count, 3
  end

  test 'auth user try edit a comment with different user id' do
    assert_equal Comment.count, 1
    assert_equal User.count, 3

    exception = assert_raises(GraphQL::ExecutionError) { perform_not_owner_error() }
    assert_equal(exception.message, "You do not have the necessary permissions to edit this comment")

    assert_equal @comment.body, 'The pet'
    assert_equal User.count, 3
  end
end
