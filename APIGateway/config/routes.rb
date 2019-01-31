Rails.application.routes.draw do

  # Routes to login and register APIs present in app/controller/auth_controller/
  post 'auth/login'
  post 'auth/register'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
