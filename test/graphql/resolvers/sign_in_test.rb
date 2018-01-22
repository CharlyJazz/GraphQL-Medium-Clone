require 'test_helper'

class Resolvers::SignInUserTest < ActiveSupport::TestCase
  setup do
    create(:user)
  end

  def perform(args = {})
    Resolvers::SignInUser.new.call(nil, args, nil)
  end

  test 'sign in user' do
    signin = perform(
      credentials: {
        email: 'email@example.com',
        password: '[omitted]'
      }
    )

    assert signin.token.blank? == false
    assert AuthToken.verify(signin.token).kind_of? User
    assert_equal signin.user.id, 1
    assert_equal signin.user.name, 'name'
    assert_equal signin.user.email, 'email@example.com'
  end
end