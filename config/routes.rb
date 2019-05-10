Rails.application.routes.draw do
  root 'recipes#index'
  devise_for :users

  resources :recipes, only: [:index, :create, :show]
  resources :comments, only: [:index, :create]

  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:index, :create, :show]
      post 'recipes/search', to: 'recipes#search'
    end
  end
end
