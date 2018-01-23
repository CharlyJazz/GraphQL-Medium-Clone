require 'test_helper'

class ClapTest < ActiveSupport::TestCase
  setup do
    @post = create(:post)
  end

  test "Create 3 claps and the total claps sum should be 10" do
    assert_equal @post.claps.length, 0
    assert_equal @post.claps.sum(:total), 0

    clap_1 = Clap.new(total: 2, user: User.find(1))
    clap_2 = Clap.new(total: 3, user: User.find(1))
    clap_3 = Clap.new(total: 5, user: User.find(1))
    
    @post.claps << clap_1
    @post.claps << clap_2
    @post.claps << clap_3

    assert_equal @post.claps.length, 3
    assert_equal @post.claps.sum(:total), 10
  end

  test "Create one claps for severals user claps action" do
    user_will_claps = create(:user)
    
    clap = Clap.new(total: 2, user: user_will_claps)

    @post.claps << clap

    assert_equal @post.claps.length, 1
    assert_equal @post.claps.sum(:total), 2

    # The same user make 2 more claps
    
    check_if_user_have_claps = @post.claps.where(:user_id => user_will_claps.id).first
    
    unless check_if_user_have_claps.blank?
      check_if_user_have_claps.total += 2
      check_if_user_have_claps.save
    end

    assert_equal @post.claps.sum(:total), 4

    # Other use make 4 claps, them create other clap record

    user_will_claps = create(:user)

    clap = Clap.new(total: 4, user: user_will_claps)
    
    check_if_user_have_claps = @post.claps.where(:user_id => user_will_claps.id).first

    if check_if_user_have_claps.blank?
      @post.claps << clap

      assert_equal @post.claps.sum(:total), 8
    end
  end
end
