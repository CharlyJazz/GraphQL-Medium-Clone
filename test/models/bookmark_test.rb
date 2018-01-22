require 'test_helper'

class BookmarkTest < ActiveSupport::TestCase
  test "Create bookmark" do
    create(:bookmark)

    assert Bookmark.count == 1
  end

  test "Delete bookmark" do
    
  end
end
