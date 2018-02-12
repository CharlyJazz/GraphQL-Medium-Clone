class User < ApplicationRecord
  has_secure_password

  has_many :claps
  has_many :claps_posts, through: :claps, source: :post
  has_many :comments
  has_many :posts
  has_many :collections
  has_many :bookmarks
  
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :picture, presence: false
end