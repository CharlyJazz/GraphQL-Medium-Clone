class Collection < ApplicationRecord
  belongs_to :user
  
  has_and_belongs_to_many :posts

  validates :title, presence: true
  validates :description, presence: true
  validates :picture, presence: true
end
