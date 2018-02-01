require 'test_helper'

class Resolvers::CreatePostTest < ActiveSupport::TestCase
  setup do
    @topic = create(:topic)

    create(:user)
  end

  def perform(args = {}, ctx = {current_user: User.find(1)})
    Resolvers::CreatePost.new.call(nil, args, ctx)
  end

  test 'creating with auth' do
    post = perform(
      title: "Post Title",
      body: "Post Body",
      picture: "post.png",
      topicId: @topic.id
    )

    assert post.persisted?
    assert_equal post.id, 1
    assert_equal post.title, 'Post Title'
    assert_equal post.body, 'Post Body'
    assert_equal post.picture, 'post.png'
    assert_equal Post.count, 1
  end

  test 'creating with auth and tags' do
    tags = [create(:tag), create(:tag), create(:tag), create(:tag)]

    post = perform(
      title: "Post Title",
      body: "Post Body",
      picture: "post.png",
      tagsId: tags.map {|tag| tag.id},
      topicId: @topic.id
    )

    assert post.persisted?
    assert_equal post.tags.length, tags.length
  end 
end