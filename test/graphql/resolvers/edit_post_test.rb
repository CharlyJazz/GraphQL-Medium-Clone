require 'test_helper'

class Resolvers::EditPostTest < ActiveSupport::TestCase
  setup do
    @post = create(:post)
    @user = create(:user)
    @topic = create(:topic)
    @post_body = 'Edited'
    @post_title = 'Edited'
    @post_picture = 'Edited'
    @post_topic = @topic.id
  end

  def perform_owner_success(
    args = {
      id: @post.id,
      body: @post_body,
      title: @post_title,
      picture: @post_picture,
      topicId: @post_topic
    },
    ctx = {
      current_user: User.find(@post.user_id)
    }
  )
    Resolvers::EditPost.new.call(nil, args, ctx)
  end

  def perform_guest_error(
    args = {
      id: @post.id,
      body: @post_body,
      title: @post_title,
      picture: @post_picture,
      topicId: @post_topic
    },
    ctx={}
  )
    Resolvers::EditPost.new.call(nil, args, ctx)
  end

  def perform_not_owner_error(
    args = {
      id: @post.id,
      body: @post_body,
      title: @post_title,
      picture: @post_picture,
      topicId: @post_topic
    },
    ctx = {
      current_user: User.find(@user.id)
    }
  )
    Resolvers::EditPost.new.call(nil, args, ctx)
  end

  test 'owner auth user edit a post with success' do
    perform = perform_owner_success()

    assert perform.persisted?
    assert_equal perform.body, @post_body
    assert_equal perform.title, @post_title
    assert_equal perform.picture, @post_picture
    assert_equal perform.topic_id, @post_topic
  end

  test 'guest user edit a post with error' do
    exception = assert_raises(GraphQL::ExecutionError) { perform_guest_error() }
    assert_equal(exception.message, "Authentication required")

    assert_not_equal @post.body, @post_body
    assert_not_equal @post.title, @post_title
    assert_not_equal @post.picture, @post_picture
    assert_not_equal @post.topic_id, @post_topic
  end

  test 'auth user try edit a post with different user id' do
    exception = assert_raises(GraphQL::ExecutionError) { perform_not_owner_error() }
    assert_equal(exception.message, "You do not have the necessary permissions to edit this post")

    assert_not_equal @post.body, @post_body
    assert_not_equal @post.title, @post_title
    assert_not_equal @post.picture, @post_picture
    assert_not_equal @post.topic_id, @post_topic
  end
end
