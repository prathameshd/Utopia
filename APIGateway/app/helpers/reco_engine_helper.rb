require 'net/http'
require 'json'

# Helper module to maintain logic to access the Profile Services
module RecoEngineHelper

  # Get recommended valence helper, used to call the /getRecommendedValence present in RecommendationEngine
  def get_recommended_valence_helper(url)
    begin
      #host_details = zookeeper_helper(url)
      host = "localhost"#{}host_details["host"]
      port = "8001"#{}host_details["port"].to_s
      uri = URI('http://'+host+':'+port+'/getRecommendedValence')
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
