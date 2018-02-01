class AddTopicIdToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :topic_id, :integer
    add_index  :posts, :topic_id
  end
end
