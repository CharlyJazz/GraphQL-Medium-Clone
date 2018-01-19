Rails.application.routes.draw do
  get 'index/index'

  root 'index#index'
end
