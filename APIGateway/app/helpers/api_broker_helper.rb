require 'net/http'
require 'json'

# Helper module to maintain logic to access the APIBroker
module ApiBrokerHelper

  # Get Auth helper, used to call the /get_auth_helper present in APIBroker
  def get_auth_helper(url)
    begin
      p 'dhjashdjasdka'
      host_details = zookeeper_helper(url)
      p host_details
      host = host_details["host"]
      port = host_details["port"].to_s
      uri = URI('http://'+host+':'+port+'/getAuth')
      http = Net::HTTP.new(host, port)
      req = Net::HTTP::Get.new(uri.path, {'Content-Type' =>'application/json',
        'Authorization' => request.headers[:Authorization]})
      http.request(req)
    rescue => e
      raise e
    end
  end

  # Get accessed helper, used to call the /get_access_helper present in APIBroker
  def get_access_helper(url, api_broker_params)
    begin
      #host_details = zookeeper_helper(url)
      host = "localhost"#host_details["host"]
      port = "3002"#host_details["port"].to_s
      uri = URI('http://'+host+':'+port+'/getAccess')
      http = Net::HTTP.new(host, port)
      req = Net::HTTP::Post.new(uri.path, {'Content-Type' =>'application/json',
        'Authorization' => request.headers[:Authorization]})
      req.body = {"codeCode" => api_broker_params['codeCode']}.to_json
      http.request(req)
    rescue => e
      raise e
    end
  end

  # Search Song helper, used to call the /search_song_helper present in APIBroker
  def search_song_helper(url, api_broker_params)
    begin
      #host_details = zookeeper_helper(url)
      host = 'localhost'#host_details["host"]
      port = '3002'#host_details["port"].to_s
      uri = URI('http://'+host+':'+port+'/searchSong')
      http = Net::HTTP.new(host, port)
      req = Net::HTTP::Post.new(uri.path, {'Content-Type' =>'application/json',
        'Authorization' => request.headers[:Authorization]})
      req.body = {"access_token" => api_broker_params['access_token'], "q"=>api_broker_params['q']}.to_json
      http.request(req)
    rescue => e
      raise e
    end
  end

  # Get Valence helper, used to call the /get_valence_helper present in APIBroker
  def get_valence_helper(url,api_broker_params)
    begin
      #host_details = zookeeper_helper(url)
      host = 'localhost'#host_details["host"]
      port = '3002'#host_details["port"].to_s
      uri = URI('http://'+host+':'+port+'/getValence')
      http = Net::HTTP.new(host, port)
      req = Net::HTTP::Post.new(uri.path, {'Content-Type' =>'application/json',
        'Authorization' => request.headers[:Authorization]})
      req.body = {"access_token" => api_broker_params['access_token'], "songId"=>api_broker_params['songId']}.to_json
      http.request(req)
    rescue => e
      raise e
    end
  end

  # Get Recommended Tracks helper, used to call the /get_recommended_track_helper present in APIBroker
  def get_recommended_track_helper(url,api_broker_params)
    begin
      #host_details = zookeeper_helper(url)
      host = 'localhost'#host_details["host"]
      port = '3002'#host_details["port"].to_s
      uri = URI('http://'+host+':'+port+'/getRecommendedTracks')
      http = Net::HTTP.new(host, port)
      req = Net::HTTP::Post.new(uri.path, {'Content-Type' =>'application/json',
        'Authorization' => request.headers[:Authorization]})
      req.body = {"access_token" => api_broker_params['access_token'], "valence"=>api_broker_params['valence']}.to_json
      http.request(req)
    rescue => e
      raise e
    end
  end

  # Zookeeper handler to retrieve the auth services host and port
  def zookeeper_helper(url)
    z = Zookeeper.new("149.165.170.7:2181")
    host_details= z.get(:path => url)
    host_details=JSON.parse(host_details[:data])
    host_details
  end

end
