require 'net/http'
require 'json'

class RecommendationEngineController < ApplicationController
  #Heloper to offload the logic from controller
  include RecoEngineHelper

  # Get history and mood controller. Can be accessed by "/recommendation_engine/get_recommended_valence"
  def get_recommended_valence
    begin
      res = get_recommended_valence_helper(reco_engine_uri)
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
  # Method to retrieve host for APIBroker
  def reco_engine_uri
    "/home/centos/Team-Rocket/RecoEngineWorkspace"
  end

end
