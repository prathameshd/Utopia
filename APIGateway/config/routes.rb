Rails.application.routes.draw do

  # Routes to APIs present in app/controller/recommendation_engine/
  get 'recommendation_engine/get_recommended_valence'

  # Routes to APIs present in app/controller/profile_services_controller/
  get 'profile_service/get_history_and_mood'
  post 'profile_service/set_history_and_mood'
  get 'profile_service/get_personal_details'

  # Routes to APIs present in app/controller/api_broker_controller/
  get 'api_broker/get_auth'
  post 'api_broker/get_access'
  post 'api_broker/search_song'
  post 'api_broker/get_valence'
  post 'api_broker/get_recommended_track'
  post 'api_broker/pass_ip'
  get 'api_broker/get_news'

  # Routes to login and register APIs present in app/controller/auth_controller/
  post 'auth/login'
  post 'auth/register'
  post 'auth/checkUser'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
