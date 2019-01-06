require 'test_helper'

class TagTest < ActiveSupport::TestCase
  setup do
    @post = create(:post)
    @tags = [create(:tag), create(:tag), create(:tag), create(:tag)]
  end

  test "Create Tag with the Factory" do
    assert_equal Tag.count, 4
  end

  test "Add tags to post" do
    @tags.each { |n| @post.tags << n}

    assert_equal @post.tags.length, @tags.length
  end

  test "Remove tags from post" do
    @tags.each { |n| @post.tags << n}

    assert_equal @post.tags.length, @tags.length

    @post.tags.delete(2, 4)

    assert_equal @post.tags.length, 2
  end
end
