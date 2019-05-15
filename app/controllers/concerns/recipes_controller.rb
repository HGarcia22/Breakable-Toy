class RecipessController < ApplicationController
  def show
    @recipes = current_user.recipes
  end
end 
