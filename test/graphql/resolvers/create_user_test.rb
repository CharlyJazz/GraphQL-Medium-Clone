require 'test_helper'

class Resolvers::CreateUserTest < ActiveSupport::TestCase
  setup do
    @username = 'charlyjazz'
    @password = '[omitted]'
    @email = 'email@example.com'
    @first_name = 'Charly'
    @last_name = 'Jazz'
    @bio = 'Bio fake'
    @picture = 'imagen.jpg'
  end

  def perform(args = {})
    Resolvers::CreateUser.new.call(nil, args, nil)
  end

  test 'creating new user without bio and picture' do
    user = perform(
      username: @username,
      first_name: @first_name,
      last_name: @last_name,
      credentials: {
        email: @email,
        password: @password
      }
    )

    assert user.persisted?
    assert_equal user.username, @username
    assert_equal user.email, @email
    assert_equal user.first_name, @first_name
    assert_equal user.last_name, @last_name
    assert_nil user.picture
    assert_nil user.bio
    assert_equal User.count, 1
  end

  test 'creating new user with bio and picture' do
    user = perform(
      username: @username,
      first_name: @first_name,
      last_name: @last_name,
      bio: @bio,
      picture: @picture,
      credentials: {
        email: @email,
        password: @password
      }
    )

    assert user.persisted?
    assert_equal user.username, @username
    assert_equal user.email, @email
    assert_equal user.first_name, @first_name
    assert_equal user.last_name, @last_name
    assert_equal user.picture, @picture
    assert_equal user.bio, @bio
    assert_equal User.count, 1
  end
end