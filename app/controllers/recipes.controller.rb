class RecipesController < ApplicationController
  before_action :authorize_user, except: [:index, :show]
  def index

  end

  def create

  end 
end
