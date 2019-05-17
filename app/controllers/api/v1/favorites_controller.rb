class Api::V1::RecipesController < ApplicationController
protect_from_forgery unless: -> { request.format.json? }
def index

end 
end
