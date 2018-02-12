require 'test_helper'

class UserTest < ActiveSupport::TestCase
  setup do
    @post_1 = create(:post)
    @post_2 = create(:post)
    @user = create(:user)
  end
  test 'User have 4 claps total with the total 15' do
    clap_1 = Clap.new(total: 2, user: @user)
    clap_2 = Clap.new(total: 3, user: @user)
    clap_3 = Clap.new(total: 5, user: @user)
    clap_4 = Clap.new(total: 5, user: @user)
    
    @post_1.claps << clap_1
    @post_1.claps << clap_2
    @post_1.claps << clap_3
    @post_2.claps << clap_4

    assert_equal @user.claps_posts.count, 4
    assert_equal @user.claps_posts.sum(:total), 15
  end
end
