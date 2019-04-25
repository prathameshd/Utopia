require 'net/http'
require 'json'

# Helper module to maintain logic to access the AuthServices
module AuthServiceHelper

  # Login helper, used to call the /login present in AuthServices
  def login_helper(url, auth_params)
    begin
      host_details = zookeeper_helper(url)
      host = host_details["host"]
      port = host_details["port"].to_s
      uri = URI('http://'+host+':'+port+'/login')
      http = Net::HTTP.new(host, port)
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
      host_details = zookeeper_helper(url)
      host = host_details["host"]
      port = host_details["port"].to_s
      uri = URI('http://'+host+':'+port+'/register')
      http = Net::HTTP.new(host, port)
      req = Net::HTTP::Post.new(uri.path, {'Content-Type' =>'application/json',
        'Authorization' => request.headers[:Authorization]})
      req.body = {"email" => auth_params['email'], "password" => auth_params['password'],
        "confirmPassword"=>auth_params['confirmPassword'],
        "dob"=>auth_params['dob'], "firstName" => auth_params['firstName'],
        "lastName"=>auth_params['lastName'], "username" => auth_params['username']}.to_json
      http.request(req)
    rescue => e
      raise e
    end
  end


  # Registeration helper, used to call the /register present in AuthServices
  def checkUser_helper(url, auth_params)
    begin
      host_details = zookeeper_helper(url)
      host = host_details["host"]
      port = host_details["port"].to_s
      uri = URI('http://'+host+':'+port+'/checkUser')
      http = Net::HTTP.new(host, port)
      req = Net::HTTP::Post.new(uri.path, {'Content-Type' =>'application/json',
        'Authorization' => request.headers[:Authorization]})
      req.body = {"email" => auth_params['email'], "firstName" => auth_params['firstName']}.to_json
      http.request(req)
    rescue => e
      raise e
    end
  end


  # Zookeeper handler to retrieve the auth services host and port
  def zookeeper_helper(url)
    # z = Zookeeper.new("149.165.170.7:2181")
    # host_details= z.get(:path => url)
    # host_details=JSON.parse(host_details[:data])
    host_details={"host"=>"localhost", "port"=>5000}
    host_details
  end

end
