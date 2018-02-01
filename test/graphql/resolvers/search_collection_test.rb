require 'test_helper'

class Resolvers::CollectionsSearchTest < ActiveSupport::TestCase
  def find(args)
    Resolvers::SearchCollections.call(nil, args, nil)
  end

  test 'filter option' do
    collection1 = create(:collection)
    collection2 = create(:collection)
    collection3 = create(:collection)

    create(:collection) # Should ignored

    result = find(
      filter: {
        'title_contains' => collection1.title,
        'OR' => [{
          'description_contains' => collection1.description,
          'OR' => [{
            'description_contains' => collection2.description
          }]
        }, {
          'title_contains' => collection3.title
        }]
      }
    )

    assert_equal result.map(&:title).sort, [collection1, collection2, collection3].map(&:title).sort
  end
end