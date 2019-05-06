Rails.application.routes.draw do
  root 'recipes#index'
  devise_for :users

  resources :recipes, only: [:index]
  resources :comments, only: [:index, :create]
end
