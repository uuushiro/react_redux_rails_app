Rails.application.routes.draw do
  resources :sample, only: [:index]

  resources :todos, format: "json"
end