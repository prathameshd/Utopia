require 'net/http'
require 'json'

# Controller to maintain API gateway for AuthServices API
class AuthController < ApplicationController
  #Heloper to offload the logic from controller
  include AuthServiceHelper

  # login controller. Can be accessed by "/auth/login"
  def login
    begin
      res = login_helper(auth_uri, auth_params)
      if(res.code.include? "200")
        render :json => res.body, :status => 200
      else
        render :json => res.body, :status => 500
      end
    rescue => e
      render :json => {:error=>'Something went wrong'}, :status => 500
    end
  end

  # register controller. Can be accessed by "/auth/register"
  def register
    begin
      res = register_helper(auth_uri, auth_params)
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
  def auth_params
    params.require(:auth).permit(:firstName, :lastName, :email, :password, :confirmPassword, :dob, :username)
  end
  # Method to retrieve host for AuthServices
  def auth_uri
    "/Users/sairohithachanta/Data/SGA/Project-2/Team-Rocket/AuthServices"
  end
end
