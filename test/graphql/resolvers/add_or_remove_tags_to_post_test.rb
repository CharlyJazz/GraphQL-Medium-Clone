require 'test_helper'

class Resolvers::AddOrRemoveTagsToPostTest < ActiveSupport::TestCase
  setup do
    @post = create(:post)
    @tag1 = create(:tag)
    @tag2 = create(:tag)
    @tag3 = create(:tag)
    @tag4 = create(:tag)
    @tag5 = create(:tag)
    @tag6 = create(:tag)

    @tags = [
      @tag1,
      @tag2,
      @tag3,
      @tag4,
      @tag5,
      @tag6
    ]
  end

  test 'add tags to the post' do
    perform = Resolvers::AddOrRemoveTagsToPost.new.call(
      nil,
      args = {
        postId: @post.id,
        idTagsToAdd: [
          @tag3.id,
          @tag4.id,
          @tag5.id,
          @tag6.id
        ]
      },
      ctx = {
        current_user: User.find(@post.user_id)
      }
    )

    assert_equal perform.tags.length, 4
  end

  test 'remove tags to the post' do
    @tags.each { |n| @post.tags << n}

    assert_equal @post.tags.length, @tags.length

    perform = Resolvers::AddOrRemoveTagsToPost.new.call(
      nil,
      args = {
        postId: @post.id,
        idTagsToRemove: [
          @tag3.id,
          @tag4.id
        ]
      },
      ctx = {
        current_user: User.find(@post.user_id)
      }
    )

    assert_equal perform.tags.length, @tags.length - 2

  end

  test 'remove and add tags to the post' do
    @post.tags << @tag1
    @post.tags << @tag2

    assert_equal @post.tags.length, 2

    perform = Resolvers::AddOrRemoveTagsToPost.new.call(
      nil,
      args = {
        postId: @post.id,
        idTagsToRemove: [
          @tag2.id
        ],
        idTagsToAdd: [
          @tag3.id,
          @tag4.id
        ]
      },
      ctx = {
        current_user: User.find(@post.user_id)
      }
    )

    assert_equal perform.tags.length, 3
  end
end
