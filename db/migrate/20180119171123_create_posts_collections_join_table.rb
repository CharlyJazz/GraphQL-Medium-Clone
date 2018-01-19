class CreatePostsCollectionsJoinTable < ActiveRecord::Migration[5.1]
  def change
    create_join_table :posts, :collections do |t|
      t.index :post_id
      t.index :collection_id
    end
  end
end
