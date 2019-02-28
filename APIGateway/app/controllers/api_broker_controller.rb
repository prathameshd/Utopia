require 'json'
class ApiBrokerController < ApplicationController
  #Heloper to offload the logic from controller
  include ApiBrokerHelper

  def get_auth
    begin
      res = get_auth_helper(api_broker_uri)
      if(res.code.include? "200")
        render :json => res.body, :status => 200
      else
        render :json => res.body, :status => 500
      end
    rescue => e
      p e
      render :json => {:error=>'Something went wrong'}, :status => 500
    end
  end

  def get_access
    begin
      res = get_access_helper(api_broker_uri, api_broker_params)
      if(res.code.include? "200")
        render :json => res.body, :status => 200
      else
        render :json => res.body, :status => 500
      end
    rescue => e
      p e
      render :json => {:error=>'Something went wrong'}, :status => 500
    end
  end

  def search_song
    begin
      res = search_song_helper(api_broker_uri, api_broker_params)
      if(res.code.include? "200")
        render :json => res.body, :status => 200
      else
        render :json => res.body, :status => 500
    end
  rescue => e
    p e
    render :json => {:error=>'Something went wrong'}, :status => 500
  end
  end

  def get_valence
    begin
      res = get_valence_helper(api_broker_uri, api_broker_params)
      if(res.code.include? "200")
        render :json => res.body, :status => 200
      else
        render :json => res.body, :status => 500
    end
  rescue => e
    p e
    render :json => {:error=>'Something went wrong'}, :status => 500
  end
  end

  def get_recommended_track
    begin
      res = get_recommended_track_helper(api_broker_uri, api_broker_params)
      if(res.code.include? "200")
        render :json => res.body, :status => 200
      else
        render :json => res.body, :status => 500
    end
  rescue => e
    p e
    render :json => {:error=>'Something went wrong'}, :status => 500
  end
  end

  # Private methods
  private
  # Method to extract data from post request
  def api_broker_params
    params.require(:api_broker).permit(:codeCode, :access_token, :q, :songId, :valence)
  end
  # Method to retrieve host for APIBroker
  def api_broker_uri
    "/APIBroker"
  end

end
