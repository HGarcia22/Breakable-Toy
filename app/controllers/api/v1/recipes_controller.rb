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
      "X-RapidAPI-Key" => '{ENV[RECIPE_KEY]}'
    }
    render json: response.body
  end

  def show
    recipeId = params["id"]
    response = Unirest.get "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/#{recipeId}/information",
    headers: {
    "X-RapidAPI-Host" => "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "X-RapidAPI-Key" => '{ENV[RECIPE_KEY]}'
  }

  showData = {
    title: response.body["title"],
    diet: [{"Gluten Free": response.body["glutenFree"]}, {"Vegetarian": response.body["vegetarian"]}, {"Vegan": response.body["vegan"]}, {"Ketogenic": response.body["ketogenic"]}, {"Dairy Free": response.body["dairyFree"]}, {"Whole-30": response.body["whole30"]}],
    ingredients: response.body["extendedIngredients"],
    steps: response.body["analyzedInstructions"][0]["steps"],
    recipeImage: response.body["image"],
    readyInMinutes: response.body["readyInMinutes"]
  }
      render json: showData
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
# {glutenFree: response.body["glutenFree"]}, {vegetarian: response.body["vegetarian"]}, {vegan: response.body["vegan"]}, {ketogenic: response.body["ketogenic"]}, {dairyFree: response.body["dairyFree"]}, {lowFodmap: response.body["lowFodmap"]}, {whole30: response.body["whole30"]}

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
