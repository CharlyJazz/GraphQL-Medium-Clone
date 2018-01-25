require 'test_helper'

class Resolvers::CreateCollectionTest < ActiveSupport::TestCase
  setup do
    @posts = [create(:post), create(:post), create(:post), create(:post)]
  end

  def perform(args = {}, ctx = {current_user: User.find(1)})
    Resolvers::CreateCollection.new.call(nil, args, ctx)
  end

  test 'creating collection with auth' do
    assert_equal Collection.count, 0

    collection = perform(
      title:"Title",
      description: "Description",
      picture:"image.jpg",
      postsId: @posts.map {|post| post.id}
    )

    assert_equal Collection.count, 1
    assert_equal collection.posts.length, @posts.length
  end
end