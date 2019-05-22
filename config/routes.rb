Rails.application.routes.draw do
  root 'recipes#index'
  devise_for :users

  resources :recipes, only: [:index, :show]
  resources :favorites

  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:index, :create, :show, :destroy]
      resources :favorites
      post 'recipes/search', to: 'recipes#search'
    end
  end
end
