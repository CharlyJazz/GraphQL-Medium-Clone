require 'test_helper'

class Resolvers::CreateCommentTest < ActiveSupport::TestCase
  setup do
    create(:post)
  end

  def perform(args = {}, ctx = {current_user: User.find(1)})
    Resolvers::CreateComment.new.call(nil, args, ctx)
  end

  test 'creating comment with auth' do
    comment = perform(
      body: "Comment Body",
      postId: "1"
    )

    assert comment.persisted?
    assert_equal comment.id, 1
    assert_equal comment.body, 'Comment Body'
  end
end