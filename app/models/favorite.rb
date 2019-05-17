class Favorite < ApplicationRecord
  validates :recipe_id, presence: true

  belongs_to :user
end
