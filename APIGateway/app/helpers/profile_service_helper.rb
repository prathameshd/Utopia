require 'net/http'
require 'json'

# Helper module to maintain logic to access the Profile Services
module ProfileServiceHelper

  # Get history and mood helper, used to call the /get_history_and_mood present in Profile Services
  def get_history_and_mood_helper(url)
    begin
      host_details = zookeeper_helper(url)
      host = host_details["host"]
      port = host_details["port"].to_s
      uri = URI('http://'+host+':'+port+'/getHistoryAndMood')
      http = Net::HTTP.new(host, port)
      req = Net::HTTP::Get.new(uri.path, {'Content-Type' =>'application/json',
        'Authorization' => request.headers[:Authorization]})
      http.request(req)
    rescue => e
      raise e
    end
  end

  # Get accessed helper, used to call the /get_access_helper present in APIBroker
  def set_history_and_mood_helper(url, profile_services_params)
    begin
      host_details = zookeeper_helper(url)
      host = host_details["host"]
      port = host_details["port"].to_s
      uri = URI('http://'+host+':'+port+'/setHistoryAndMood')
      http = Net::HTTP.new(host, port)
      req = Net::HTTP::Post.new(uri.path, {'Content-Type' =>'application/json',
        'Authorization' => request.headers[:Authorization]})
      req.body = {"songId" => JSON.parse(profile_services_params['song_id']), "valence" => profile_services_params['valence']}.to_json
      http.request(req)
    rescue => e
      raise e
    end
  end

  # Get history and mood helper, used to call the /get_history_and_mood present in Profile Services
  def get_personal_details_helper(url)
    begin
      host_details = zookeeper_helper(url)
      host = host_details["host"]
      port = host_details["port"].to_s
      uri = URI('http://'+host+':'+port+'/getPersonalDetails')
      http = Net::HTTP.new(host, port)
      req = Net::HTTP::Get.new(uri.path, {'Content-Type' =>'application/json',
        'Authorization' => request.headers[:Authorization]})
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
