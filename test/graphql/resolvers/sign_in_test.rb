require 'test_helper'

class Resolvers::SignInUserTest < ActiveSupport::TestCase
  setup do
    @user = create(:user)
  end

  def perform(args = {})
    Resolvers::SignInUser.new.call(nil, args, nil)
  end

  test 'sign in user' do
    signin = perform(
      credentials: {
        email: @user.email,
        password: @user.password
      }
    )

    assert signin.token.blank? == false
    assert AuthToken.verify(signin.token).kind_of? User
    assert_equal signin.user.id, @user.id
    assert_equal signin.user.username, @user.username
    assert_equal signin.user.email, @user.email
  end
end