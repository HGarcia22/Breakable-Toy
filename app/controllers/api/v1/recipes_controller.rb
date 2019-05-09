class Api::V1::RecipesController < ApplicationController

  def index
    # binding.pry
  end

  def create
    # binding.pry
  end

  def search
    if params["formPayload"]
      query = "&query=#{params["formPayload"].values}"
    end
    response = Unirest.get "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=10&offset=0#{query}",
    headers: {
      "X-RapidAPI-Host" => "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "X-RapidAPI-Key" => "#{ENV[RECIPE_KEY]}"
    }
    render json: response.body
  end

  def show
    binding.pry
    recipeId = params["recipeId"]
    response = Unirest.get "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/#{recipeId}/analyzedInstructions?stepBreakdown=false",
      headers:{
        "X-RapidAPI-Host" => "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key" => "#{ENV[RECIPE_KEY]}"
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
