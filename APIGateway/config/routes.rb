Rails.application.routes.draw do

  # Routes to APIs present in app/controller/profile_services_controller/
  get 'profile_services/get_history_and_mood'
  post 'profile_services/set_history_and_mood'
  get 'profile_services/get_personal_details'

  # Routes to APIs present in app/controller/api_broker_controller/
  get 'api_broker/get_auth'
  post 'api_broker/get_access'
  post 'api_broker/search_song'
  post 'api_broker/get_valence'
  post 'api_broker/get_recommended_track'

  # Routes to login and register APIs present in app/controller/auth_controller/
  post 'auth/login'
  post 'auth/register'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
