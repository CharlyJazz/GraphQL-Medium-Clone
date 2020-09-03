class AddTokenExpirityToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :token_sent_at, :datetime
  end
end
