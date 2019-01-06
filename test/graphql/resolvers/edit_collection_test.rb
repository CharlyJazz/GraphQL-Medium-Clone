require 'test_helper'

class Resolvers::EditCollectionTest < ActiveSupport::TestCase
  setup do
    @collection = create(:collection)
    @user = create(:user)
    @collection_title = 'collection_title'
    @collection_description = 'collection_description'
    @collection_picture = 'collection_picture.png'
  end

  def perform_owner_success(
    args = {
      id: @collection.id,
      title: @collection_title,
      description: @collection_description,
      picture: @collection_picture
    },
    ctx = {
      current_user: User.find(@collection.user_id)
    }
  )
    Resolvers::EditCollection.new.call(nil, args, ctx)
  end

  def perform_guest_error(
    args = {
      id: @collection.id,
      title: @collection_title,
      description: @collection_description,
      picture: @collection_picture
    }, ctx={}
  )
    Resolvers::EditCollection.new.call(nil, args, ctx)
  end

  def perform_not_owner_error(
    args = {
      id: @collection.id,
      title: @collection_title,
      description: @collection_description,
      picture: @collection_picture
    },
    ctx = {
      current_user: User.find(@user.id)
    }
  )
    Resolvers::EditCollection.new.call(nil, args, ctx)
  end


  test 'owner auth user edit a collection with success' do
    perform = perform_owner_success()

    assert perform.persisted?
    assert_equal perform.title, @collection_title
    assert_equal perform.description, @collection_description
    assert_equal perform.picture, @collection_picture
  end

  test 'guest user edit a collection with error' do
    exception = assert_raises(GraphQL::ExecutionError) { perform_guest_error() }
    assert_equal(exception.message, "Authentication required")

    assert_not_equal @collection.title, @collection_title
    assert_not_equal @collection.description, @collection_description
    assert_not_equal @collection.picture, @collection_picture
  end

  test 'auth user try edit a collection with different user id' do
    exception = assert_raises(GraphQL::ExecutionError) { perform_not_owner_error() }
    assert_equal(exception.message, "You do not have the necessary permissions to edit this collection")

    assert_not_equal @collection.title, @collection_title
    assert_not_equal @collection.description, @collection_description
    assert_not_equal @collection.picture, @collection_picture
  end
end
