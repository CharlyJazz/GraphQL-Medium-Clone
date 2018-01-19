class CreateCollections < ActiveRecord::Migration[5.1]
  def change
    create_table :collections do |t|
      t.string :title
      t.string :description
      t.string :picture
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
