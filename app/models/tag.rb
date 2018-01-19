class Tag < ApplicationRecord
  has_and_belongs_to_many :posts
  
  validates :name, presence: true, uniqueness: true
  validates :description, presence: true
end
