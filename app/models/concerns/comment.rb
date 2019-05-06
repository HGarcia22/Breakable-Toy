class Comment < ApplicationRecord
  validates :body, presence: true

  belongs_to :recipe
  belongs_to :user 
end
