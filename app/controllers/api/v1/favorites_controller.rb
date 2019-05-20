class Api::V1::FavoritesController < ApplicationController
protect_from_forgery unless: -> { request.format.json? }

  def index
      id = current_user.favorites.map do |favorite|
        favorite.recipe_id
      end
      query = id.join("%2C")

      query_url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=#{query}"

      response = Unirest.get query_url,
      headers:{
        "X-RapidAPI-Host" => "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key" => "3cb8331499mshd5eddeb52d6ac1ap1323fbjsn2e0b8fa008e1"
      }
    recipes = []
    response.body.map do |query|
      recipes.push([query["title"], query["id"], query["image"]])
    end
    render json: recipes
  end
end
