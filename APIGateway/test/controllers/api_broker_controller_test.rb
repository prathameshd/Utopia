require 'test_helper'

class ApiBrokerControllerTest < ActionDispatch::IntegrationTest
  test "should get get_auth" do
    get api_broker_get_auth_url
    assert_response :success
  end

  test "should get get_access" do
    get api_broker_get_access_url
    assert_response :success
  end

  test "should get search_song" do
    get api_broker_search_song_url
    assert_response :success
  end

  test "should get get_valence" do
    get api_broker_get_valence_url
    assert_response :success
  end

  test "should get get_recommended_tracks" do
    get api_broker_get_recommended_tracks_url
    assert_response :success
  end

end
