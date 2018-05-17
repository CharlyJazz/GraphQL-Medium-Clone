class User < ApplicationRecord
  has_secure_password

  has_many :claps
  has_many :claps_posts, through: :claps, source: :post
  has_many :comments
  has_many :posts
  has_many :collections
  has_many :bookmarks

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :picture, presence: false
  validates :bio, presence: false
end