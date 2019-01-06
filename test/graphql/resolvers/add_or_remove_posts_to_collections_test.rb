require 'test_helper'

class Resolvers::AddOrRemovePostsToCollectionsTest < ActiveSupport::TestCase
  setup do
    @collection = create(:collection)
    @post1 = create(:post)
    @post2 = create(:post)
    @post3 = create(:post)
    @post4 = create(:post)
    @post5 = create(:post)
    @post6 = create(:post)

    @posts = [
      @post1,
      @post2,
      @post3,
      @post4,
      @post5,
      @post6
    ]
  end

  test 'add posts to the collection' do
    perform = Resolvers::AddOrRemovePostsToCollections.new.call(
      nil,
      args = {
        collectionId: @collection.id,
        idPostsToAdd: [
          @post3.id,
          @post4.id,
          @post5.id,
          @post6.id
        ]
      },
      ctx = {
        current_user: User.find(@collection.user_id)
      }
    )

    assert_equal perform.posts.length, 4
  end

  test 'remove posts to the collection' do
    @posts.each { |n| @collection.posts << n}

    assert_equal @collection.posts.length, @posts.length

    perform = Resolvers::AddOrRemovePostsToCollections.new.call(
      nil,
      args = {
        collectionId: @collection.id,
        idPostsToRemove: [
          @post3.id,
          @post4.id
        ]
      },
      ctx = {
        current_user: User.find(@collection.user_id)
      }
    )

    assert_equal perform.posts.length, @posts.length - 2

  end

  test 'remove and add posts to the collection' do
    @collection.posts << @post1
    @collection.posts << @post2

    assert_equal @collection.posts.length, 2

    perform = Resolvers::AddOrRemovePostsToCollections.new.call(
      nil,
      args = {
        collectionId: @collection.id,
        idPostsToAdd: [
          @post2.id
        ],
        idPostsToRemove: [
          @post3.id,
          @post4.id
        ]
      },
      ctx = {
        current_user: User.find(@collection.user_id)
      }
    )

    assert_equal perform.posts.length, 3
    assert_equal @collection.id, perform.id # Just TOC :)
  end
end
