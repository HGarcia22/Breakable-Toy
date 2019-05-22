class Api::V1::RecipesController < ApplicationController
protect_from_forgery unless: -> { request.format.json? }

<<<<<<< HEAD
  def create
  end

=======
>>>>>>> 7d754a9b53a068d42651307da6461441cc67ce6a
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
    selected = false
    if current_user
    current_user.favorites.each do |favorite|
      if favorite.recipe_id == recipeId
        selected = true
      end
    end
  end

    response = Unirest.get "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/#{recipeId}/information",
    headers: {
    "X-RapidAPI-Host" => "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "X-RapidAPI-Key" => "3cb8331499mshd5eddeb52d6ac1ap1323fbjsn2e0b8fa008e1"
    }

    showData = {
      id: recipeId,
      title: response.body["title"],
      diet: [{"Gluten Free": response.body["glutenFree"]}, {"Vegetarian":   response.body["vegetarian"]}, {"Vegan": response.body["vegan"]}, {"Ketogenic":   response.body["ketogenic"]}, {"Dairy Free": response.body["dairyFree"]}],
      ingredients: response.body["extendedIngredients"],
      steps: response.body["analyzedInstructions"][0]["steps"],
      recipeImage: response.body["image"],
      readyInMinutes: response.body["readyInMinutes"], favorited: selected, current_user: current_user
    }
    render json: showData
  end
<<<<<<< HEAD

  def destroy
  end
=======
>>>>>>> 7d754a9b53a068d42651307da6461441cc67ce6a
end
