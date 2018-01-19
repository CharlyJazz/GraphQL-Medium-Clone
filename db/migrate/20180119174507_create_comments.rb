class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.text :body
      t.references :posts, foreign_key: true
      t.references :users, foreign_key: true

      t.timestamps
    end
  end
end
