class Clap < ApplicationRecord
  after_initialize :set_default_values

  def set_default_values
    self.total ||= 0
  end
  
  belongs_to :user
  belongs_to :post

  validates :total, presence: true
end