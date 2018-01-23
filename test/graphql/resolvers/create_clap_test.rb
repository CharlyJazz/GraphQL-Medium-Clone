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
    assert_equal clap.totalClaps, 4
    assert_equal clap.totalClaps, @post.claps.sum(:total)

    clap = perform(
      postId: "1",
      totalClaps: 4
    )

    assert_equal @post.claps.all.length, 1
    assert_equal clap.totalClaps, 8
    assert_equal clap.totalClaps, @post.claps.sum(:total)

    user_new = create(:user)
    
    clap = Resolvers::CreateClap.new.call(nil, {
      postId: "1",
      totalClaps: 2
    }, {
      current_user: user_new
    })

    assert_equal @post.claps.all.length, 2
    assert_equal clap.totalClaps, 10
    assert_equal clap.totalClaps, @post.claps.sum(:total)
  end
end