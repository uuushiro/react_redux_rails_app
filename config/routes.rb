Rails.application.routes.draw do
  resources :sample, only: [:index]

  resources :todos, only: [:index], format: "json"
end