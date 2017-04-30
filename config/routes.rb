Rails.application.routes.draw do
  resources :sample, only: [:index]

  resources :todos do
    get 'toggle'
  end
end