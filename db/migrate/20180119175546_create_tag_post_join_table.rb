class CreateTagPostJoinTable < ActiveRecord::Migration[5.1]
  def change
    create_join_table :tags, :post do |t|
      t.index :tag_id
      t.index :post_id
    end
  end
end
