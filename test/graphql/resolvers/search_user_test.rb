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
        'name_contains' => user1.name,
        'OR' => [{
          'name_contains' => user1.name,
          'OR' => [{
            'name_contains' => user2.name
          }]
        }, {
          'name_contains' => user3.name
        }]
      }
    )

    assert_equal result.map(&:name).sort, [user1, user2, user3].map(&:name).sort
  end
end