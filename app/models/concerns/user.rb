class User < ApplicationRecord
  has_many :favorites
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  validates :username, presence: true, uniqueness: true
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

end
