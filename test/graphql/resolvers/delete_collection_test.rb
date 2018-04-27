require 'test_helper'

class Resolvers::DeleteCollectionTest < ActiveSupport::TestCase
  setup do
    @collection = create(:collection)

    @user = create(:user)
  end

  def perform_owner_success(
    args = {
      id: @collection.id
    },
    ctx = {
      current_user: User.find(@collection.user_id)
    }
  )
    Resolvers::DeleteCollection.new.call(nil, args, ctx)
  end

  def perform_guest_error(args = {id: @collection.id}, ctx={})
    Resolvers::DeleteCollection.new.call(nil, args, ctx)
  end

  def perform_not_owner_error(
    args = {
      id: @collection.id
    },
    ctx = {
      current_user: User.find(@user.id)
    }
  )
    Resolvers::DeleteCollection.new.call(nil, args, ctx)
  end
  
  test 'owner auth user delete a collection with success' do
    assert_equal Collection.count, 1
    assert_equal User.count, 2

    perform = perform_owner_success()

    assert_equal perform.message, 'Collection successfully removed'
    assert_equal Collection.count, 0
    assert_equal User.count, 2
  end

  test 'guest user delete a collection with error' do
    assert_equal Collection.count, 1
    assert_equal User.count, 2

    exception = assert_raises(GraphQL::ExecutionError) { perform_guest_error() }
    assert_equal(exception.message, "Authentication required")

    assert_equal Collection.count, 1
    assert_equal User.count, 2
  end

  test 'auth user try delete a collection with different user id' do
    assert_equal Collection.count, 1
    assert_equal User.count, 2

    exception = assert_raises(GraphQL::ExecutionError) { perform_not_owner_error() }
    assert_equal(exception.message, "You do not have the necessary permissions to delete this collection")

    assert_equal Collection.count, 1
    assert_equal User.count, 2
  end
end