class Favorite < ApplicationRecord
  validates :recipe_id, presence: true
  validates :user_id, presence: true
  validates :selected, presence: true

  belongs_to :user
end
