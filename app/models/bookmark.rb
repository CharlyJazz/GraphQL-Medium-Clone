class Bookmark < ApplicationRecord
  belongs_to :user, validate: true
  belongs_to :post, validate: true
end
