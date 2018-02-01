class Topic < ApplicationRecord
  has_many :posts
  
  validates :name, presence: true
  validates :description, presence: true
  validates :picture, presence: true
end
