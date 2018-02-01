require 'test_helper'

class Resolvers::PostsSearchTest < ActiveSupport::TestCase
  def find(args)
    Resolvers::SearchPosts.call(nil, args, nil)
  end

  test 'filter option' do
    post1 = create(:post)
    post2 = create(:post)
    post3 = create(:post)

    create(:post) # Should ignored

    result = find(
      filter: {
        'title_contains' => post1.title,
        'OR' => [{
          'body_contains' => post1.body,
          'OR' => [{
            'body_contains' => post2.body
          }]
        }, {
          'title_contains' => post3.title
        }]
      }
    )

    assert_equal result.map(&:title).sort, [post1, post2, post3].map(&:title).sort
  end
end