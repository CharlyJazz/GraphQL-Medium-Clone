require 'test_helper'

class CollectionTest < ActiveSupport::TestCase
  setup do
    @user = create(:user)
  end

  test 'Create collection' do
    collection = Collection.create(
      title: 'Javascript Tutorial',
      description: 'Bla bla bla JS',
      picture: "image.png",
      user: @user
    )

    assert_equal Collection.count, 1
  end

  test 'Collection factory' do
    create(:collection)

    assert_equal Collection.count, 1
  end

  test 'Add post to collection' do
    collection = create(:collection)
    collection.posts << create(:post)
    collection.posts << create(:post)
    collection.posts << create(:post)

    assert_equal collection.posts.length, 3
    assert_equal Collection.count, 1
  end

  test 'Remove post to collection' do
    collection = create(:collection)
    post       = create(:post)

    collection.posts << post

    assert_equal collection.posts.length, 1
    assert_equal Collection.count, 1

    collection.posts.delete(post)

    assert_equal collection.posts.length, 0
  end

  test 'Delete collection but dont delete posts' do
    collection = create(:collection)
    post       = create(:post)

    collection.posts << post

    assert_equal post.collections.length, 1

    post.collections.delete(collection)

    assert_equal post.collections.length, 0
  end
end
