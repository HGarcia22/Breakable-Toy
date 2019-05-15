class Api::V1::RecipesController < ApplicationController

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
    response = Unirest.get "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/#{recipeId}/information",
    headers: {
    "X-RapidAPI-Host" => "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "X-RapidAPI-Key" => "3cb8331499mshd5eddeb52d6ac1ap1323fbjsn2e0b8fa008e1"
  }
  showData = {
    title: response.body["title"],
    diet: [{"Gluten Free": response.body["glutenFree"]}, {"Vegetarian": response.body["vegetarian"]}, {"Vegan": response.body["vegan"]}, {"Ketogenic": response.body["ketogenic"]}, {"Dairy Free": response.body["dairyFree"]}, {"Whole-30": response.body["whole30"]}, {"Very Healthy": response.body["veryHealthy"]}, {"Sustainable": response.body["sustainable"]}],
    ingredients: response.body["extendedIngredients"],
    steps: response.body["analyzedInstructions"][0]["steps"],
    recipeImage: response.body["image"],
    readyInMinutes: response.body["readyInMinutes"]
  }
      render json: showData
  end
end

response = Unirest.get "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?cuisine=italian&number=10&offset=0&query=pasta",
  headers:{
    "X-RapidAPI-Host" => "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "X-RapidAPI-Key" => "3cb8331499mshd5eddeb52d6ac1ap1323fbjsn2e0b8fa008e1"
  }
