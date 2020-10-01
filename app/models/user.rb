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

  def generate_token!
    self.token = SecureRandom.hex(10)
    self.token_sent_at = Time.now.utc
    save!
  end

  def is_token_valid?
    (self.token_sent_at + 1.hours) > Time.now.utc
  end

  def reset_password!(password)
    self.token = nil
    self.token_sent_at = nil
    self.password = password
    self.password_confirmation = password
    save!
  end
end
