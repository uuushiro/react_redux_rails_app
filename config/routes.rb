Rails.application.routes.draw do
  resources :sample, only: [:index]
end