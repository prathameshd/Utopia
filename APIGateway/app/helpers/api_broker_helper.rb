require 'net/http'
require 'json'

# Helper module to maintain logic to access the APIBroker
module ApiBrokerHelper

  # Get News helper, used to call the /get_news_helper present in APIBroker
  def get_news_helper(url)
    begin
      host_details = zookeeper_helper(url)
      host = host_details["host"]
      port = host_details["port"].to_s
      uri = URI('http://'+host+':'+port+'/getNews')
      http = Net::HTTP.new(host, port)
      req = Net::HTTP::Get.new(uri.path, {'Content-Type' =>'application/json',
        'Authorization' => request.headers[:Authorization]})
      http.request(req)
    rescue => e
      raise e
    end
  end

  # Get Auth helper, used to call the /get_auth_helper present in APIBroker
  def get_auth_helper(url)
    begin
      host_details = zookeeper_helper(url)
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
      host_details = zookeeper_helper(url)
      host = host_details["host"]
      port = host_details["port"].to_s
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
      host_details = zookeeper_helper(url)
      host = host_details["host"]
      port = host_details["port"].to_s
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
      host_details = zookeeper_helper(url)
      host = host_details["host"]
      port = host_details["port"].to_s
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
      host_details = zookeeper_helper(url)
      host = host_details["host"]
      port = host_details["port"].to_s
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

  # Get ip helper, used to call the /pass_ip present in APIBroker
  def pass_ip_helper(url,api_broker_params)
    begin
      host_details = zookeeper_helper(url)
      host = host_details["host"]
      port = host_details["port"].to_s
      uri = URI('http://'+host+':'+port+'/passIp')
      http = Net::HTTP.new(host, port)
      req = Net::HTTP::Post.new(uri.path, {'Content-Type' =>'application/json',
        'Authorization' => request.headers[:Authorization]})
      req.body = {"ip" => api_broker_params['ip']}.to_json
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
    host_details={"host"=>ENV["APIBROKER_SERVICE_PORT_3002_TCP_ADDR"], "port"=>ENV["APIBROKER_SERVICE_PORT_3002_TCP_PORT"]}
    host_details
  end

end
