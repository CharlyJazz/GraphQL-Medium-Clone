require 'test_helper'

class Resolvers::UsersSearchTest < ActiveSupport::TestCase
  def find(args)
    Resolvers::SearchUsers.call(nil, args, nil)
  end

  test 'filter option' do
    user1 = create(:user)
    user2 = create(:user)
    user3 = create(:user)

    create(:user) # Should ignored

    result = find(
      filter: {
        'username_contains' => user1.username,
        'OR' => [{
          'username_contains' => user1.username,
          'OR' => [{
            'username_contains' => user2.username
          }]
        }, {
          'username_contains' => user3.username
        }]
      }
    )

    assert_equal result.map(&:username).sort, [user1, user2, user3].map(&:username).sort
  end
end