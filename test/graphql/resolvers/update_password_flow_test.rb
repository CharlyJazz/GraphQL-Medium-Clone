require 'test_helper'

class Resolvers::SignInUserTest < ActiveSupport::TestCase
  setup do
    @user = create(:user)
    @new_password = '12345678'
  end

  test 'Update token and update password' do
    assert_nil @user.token
    @user.generate_token!
    assert_not_nil @user.token
    assert @user.authenticate('[omitted]')
    @user.reset_password! @new_password
    assert @user.authenticate(@new_password)
  end

  test 'Can\'t update password with old token' do
    new_password = '12345678'
    token = SecureRandom.hex(10)
    token_sent_at = Time.now.utc - 1.hours
    @user.token = token
    @user.token_sent_at = token_sent_at
    @user.save!
    assert_not_nil @user.token
    assert_equal token, @user.token
    assert @user.authenticate('[omitted]')
    assert_not @user.is_token_valid?
  end
end
