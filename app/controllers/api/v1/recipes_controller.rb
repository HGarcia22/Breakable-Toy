class Api::V1::RecipesController < ApplicationController
before_action :authenticate_user!
protect_from_forgery unless: -> { request.format.json? }

  def index
  end

  def create
  end

  def search
    if params["formPayload"]["query"] != ""
      query = "&query=#{params["formPayload"]["query"]}"
    end
    if params["formPayload"]["diet"] != ""
      diet = "diet=#{params["formPayload"]["diet"]}&"
    end

    response = Unirest.get "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?#{diet}number=12&offset=0#{query}",
    headers: {
      "X-RapidAPI-Host" => "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "X-RapidAPI-Key" => "3cb8331499mshd5eddeb52d6ac1ap1323fbjsn2e0b8fa008e1"
    }

    render json: response.body
  end

  def show
    recipeId = params["id"]
    favorites = current_user.favorites

    response = Unirest.get "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/#{recipeId}/information",
    headers: {
    "X-RapidAPI-Host" => "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "X-RapidAPI-Key" => "3cb8331499mshd5eddeb52d6ac1ap1323fbjsn2e0b8fa008e1"
    }

  favorited = current_user.favorites.include?(recipeId)

  showData = {
    title: response.body["title"],
    diet: [{"Gluten Free": response.body["glutenFree"]}, {"Vegetarian": response.body["vegetarian"]}, {"Vegan": response.body["vegan"]}, {"Ketogenic": response.body["ketogenic"]}, {"Dairy Free": response.body["dairyFree"]}],
    ingredients: response.body["extendedIngredients"],
    steps: response.body["analyzedInstructions"][0]["steps"],
    recipeImage: response.body["image"],
    readyInMinutes: response.body["readyInMinutes"], favorited: favorited
  }
      render json: showData
  end

  def destroy
    recipeId = params["_json"]
    delete_record = current_user.favorites.select { |favorite| favorite.recipe_id == recipeId}
    delete_record.destroy
  end
end
