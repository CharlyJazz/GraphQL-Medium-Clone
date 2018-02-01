require 'test_helper'

class Resolvers::TagsSearchTest < ActiveSupport::TestCase
  def find(args)
    Resolvers::SearchTags.call(nil, args, nil)
  end

  test 'filter option' do
    tag1 = create(:tag)
    tag2 = create(:tag)
    tag3 = create(:tag)

    create(:tag) # Should ignored

    result = find(
      filter: {
        'name_contains' => tag1.name,
        'OR' => [{
          'name_contains' => tag1.name,
          'OR' => [{
            'name_contains' => tag2.name
          }]
        }, {
          'name_contains' => tag3.name
        }]
      }
    )

    assert_equal result.map(&:name).sort, [tag1, tag2, tag3].map(&:name).sort
  end
end