require 'unirest'
require 'pry'

class Api::V1::RecipesController < ApplicationController

  def index
    # binding.pry
  end

  def search
    binding.pry
    # test = JSON.barse(request.body.read)
    # query = test['query']
    # if params[:query]
    #   query = "&query=#{params[:query]}"
    # end
    # params['query']
    response = Unirest.get "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=10&offset=0#{query}",
    headers: {
      "X-RapidAPI-Host" => "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "X-RapidAPI-Key" => "3cb8331499mshd5eddeb52d6ac1ap1323fbjsn2e0b8fa008e1"
    }
    render json: response.body
  end



    # private
    # def empty_search_params
    #   params[:query].blank?
    # end
    #
    # def get_search_params
    #   {query: params[:query]}
    # end
end
# "#{ENV[RECIPE_KEY]}"


# You will need to do this basic thing regardless of whether your api call is on the FE or BE

# if params[:diet]
#   diet = "diet=#{params[:diet]}"
# end

# in fetch:
# make payload in FormContainer
# body of request will look something like
# {diet: event.target.value}

# request_url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?#{diet}&excludeIngredients=coconut&intolerances=egg%2C+gluten&number=10&offset=0&type=main+course&query=burger"

# if making call directly from frontend
# fetch("your query url here") <-- query url uses event.target.value to string-interpolate
