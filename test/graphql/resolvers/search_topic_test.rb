require 'test_helper'

class Resolvers::TopicsSearchTest < ActiveSupport::TestCase
  def find
    Resolvers::SearchTopics.new.call(nil, nil, nil)
  end

  test 'search all topics' do
    topic1 = create(:topic)
    topic2 = create(:topic)
    topic3 = create(:topic)
    topic4 = create(:topic)
    topic5 = create(:topic)

    result = find
    
    assert_equal result.map(&:name).sort, [topic1, topic2, topic3, topic4, topic5].map(&:name).sort
  end
end