require 'net/http'
require 'json'

class ProfileServicesController < ApplicationController
  #Heloper to offload the logic from controller
  include ProfileServiceHelper

  # Get history and mood controller. Can be accessed by "/profile_services/get_history_and_mood"
  def get_history_and_mood
    begin
      res = get_history_and_mood_helper(profile_services_uri)
      if(res.code.include? "200")
        render :json => res.body, :status => 200
      else
        render :json => res.body, :status => 500
      end
    rescue => e
      render :json => {:error=>'Something went wrong'}, :status => 500
    end
  end

  # Set history and mood controller. Can be accessed by "/profile_services/set_history_and_mood"
  def set_history_and_mood
    begin
      res = set_history_and_mood_helper(profile_services_uri, profile_services_params)
      if(res.code.include? "200")
        render :json => res.body, :status => 200
      else
        render :json => res.body, :status => 500
      end
    rescue => e
      render :json => {:error=>'Something went wrong'}, :status => 500
    end
  end

  # Get personal details controller. Can be accessed by "/profile_services/get_personal_details"
  def get_personal_details
    begin
      res = get_personal_details_helper(profile_services_uri)
      if(res.code.include? "200")
        render :json => res.body, :status => 200
      else
        render :json => res.body, :status => 500
      end
    rescue => e
      render :json => {:error=>'Something went wrong'}, :status => 500
    end
  end

  # Private methods
  private
  # Method to extract data from post request
  def profile_services_params
    params.require(:profile_service).permit(:songId, :valence)
  end
  # Method to retrieve host for APIBroker
  def profile_services_uri
    "/home/centos/Team-Rocket/ProfileServices"
  end

end
