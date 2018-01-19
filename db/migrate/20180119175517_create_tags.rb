class CreateTags < ActiveRecord::Migration[5.1]
  def change
    create_table :tags do |t|
      t.string :name, unique: true
      t.string :description

      t.timestamps
    end
  end
end
