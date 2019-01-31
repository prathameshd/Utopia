require 'net/http'
require 'json'

# Helper module to maintain logic to access the AuthServices
module AuthServiceHelper

  # Login helper, used to call the /login present in AuthServices
  def login_helper(url, auth_params)
    begin
      uri = URI(url+'/login')
      http = Net::HTTP.new(uri.host, uri.port)
      req = Net::HTTP::Post.new(uri.path, {'Content-Type' =>'application/json',
        'Authorization' => request.headers[:Authorization]})
      req.body = {"email" => auth_params['email'], "password" => auth_params['password']}.to_json
      http.request(req)
    rescue => e
      raise e
    end
  end

  # Registeration helper, used to call the /register present in AuthServices
  def register_helper(url, auth_params)
    begin
      uri = URI(url+'/register')
      http = Net::HTTP.new(uri.host, uri.port)
      req = Net::HTTP::Post.new(uri.path, {'Content-Type' =>'application/json',
        'Authorization' => request.headers[:Authorization]})
      req.body = {"email" => auth_params['email'], "password" => auth_params['password'], "confirmPassword"=>auth_params['confirmPassword'],
        "dob"=>auth_params['dob'], "firstName" => auth_params['firstName'], "lastName"=>auth_params['lastName']}.to_json
      http.request(req)
    rescue => e
      raise e
    end
  end

end
