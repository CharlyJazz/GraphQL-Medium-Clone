require 'test_helper'

class Resolvers::CreateClapTest < ActiveSupport::TestCase
  setup do
    @post = create(:post)
  end

  def perform(args = {}, ctx = {current_user: User.find(1)})
    Resolvers::CreateClap.new.call(nil, args, ctx)
  end

  test 'creating clap with auth' do
    clap = perform(
      postId: "1",
      totalClaps: 4
    )

    assert_equal @post.claps.all.length, 1
    assert_equal clap.total, 4
    assert_equal clap.total, @post.claps.sum(:total)

    clap = perform(
      postId: "1",
      totalClaps: 4
    )

    assert_equal @post.claps.all.length, 1
    assert_equal clap.total, 8
    assert_equal clap.total, @post.claps.sum(:total)

    user_new = create(:user)
    
    clap = Resolvers::CreateClap.new.call(nil, {
      postId: "1",
      totalClaps: 2
    }, {
      current_user: user_new
    })

    assert_equal @post.claps.all.length, 2
    assert_equal @post.claps.all.sum(:total), 10    
    assert_equal clap.total, 2
    assert_equal clap.total, 2
  end
end