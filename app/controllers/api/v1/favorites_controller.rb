class Api::V1::FavoritesController < ApplicationController
protect_from_forgery unless: -> { request.format.json? }

  def index
    recipes = []
    if current_user.favorites[0]
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
      response.body.map do |query|
        recipes.push([query["title"], query["id"], query["image"]])
      end
    end

    render json: recipes.reverse
  end

  def destroy
    recipeId = params["id"]
    favorite_delete = nil
    current_user.favorites.each do |favorite|
      if favorite.recipe_id == recipeId
        favorite_delete = favorite
      end
    end
    Favorite.destroy(favorite_delete.id)

    render json: {favorited: false}
  end

  def create
    recipe_id = params["_json"]
    favorite = Favorite.new(user_id: current_user.id, recipe_id: recipe_id, selected: true)
    if favorite.save
      render json: {favorited: true}
    end
  end
end
