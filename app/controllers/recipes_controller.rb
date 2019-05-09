class RecipesController < ApplicationController
def index
end 
#   before_action :authorize_user, except: [:index, :show]
#
#   def index
#     response = Unirest.get "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?diet=vegetarian&excludeIngredients=coconut&intolerances=egg%2C+gluten&number=10&offset=0&type=main+course&query=burger",
#     headers:{
#       "X-RapidAPI-Host" => "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
#       "X-RapidAPI-Key" => "3cb8331499mshd5eddeb52d6ac1ap1323fbjsn2e0b8fa008e1"
#     }
#     binding.pry
#   end
#
#   def create
#
#   end
end
