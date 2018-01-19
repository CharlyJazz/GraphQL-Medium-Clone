class CreateBookmarks < ActiveRecord::Migration[5.1]
  def change
    create_table :bookmarks do |t|
      t.references :users, foreign_key: true
      t.references :posts, foreign_key: true

      t.timestamps
    end
  end
end
