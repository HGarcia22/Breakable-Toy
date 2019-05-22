class Favorite < ApplicationRecord
  validates :selected, presence: true

  belongs_to :user
end
