class CreateClaps < ActiveRecord::Migration[5.1]
  def change
    create_table :claps do |t|
      t.references :posts, foreign_key: true
      t.references :users, foreign_key: true

      t.timestamps
    end
  end
end
