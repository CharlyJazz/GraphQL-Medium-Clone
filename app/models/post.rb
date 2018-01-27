class Post < ApplicationRecord
  belongs_to :user
  has_many   :claps
  has_many   :comments
  
  has_and_belongs_to_many :tags
  has_and_belongs_to_many :collections

  validates :title, presence: true
  validates :body, presence: true
  validates :picture, presence: true  
end