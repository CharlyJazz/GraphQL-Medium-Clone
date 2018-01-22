require 'test_helper'

class Resolvers::CreatePostTest < ActiveSupport::TestCase
  setup do
    create(:user)
  end

  def perform(args = {}, ctx = {current_user: User.find(1)})
    Resolvers::CreatePost.new.call(nil, args, ctx)
  end

  test 'creating with auth' do
    post = perform(
      title: "Post Title",
      body: "Post Body",
      picture: "post.png"
    )

    assert post.persisted?
    assert_equal post.id, 1
    assert_equal post.title, 'Post Title'
    assert_equal post.body, 'Post Body'
    assert_equal post.picture, 'post.png'
    assert_equal Post.count, 1
  end
end