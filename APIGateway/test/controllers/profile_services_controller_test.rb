require 'test_helper'

class ProfileServicesControllerTest < ActionDispatch::IntegrationTest
  test "should get get_history_and_mood" do
    get profile_services_get_history_and_mood_url
    assert_response :success
  end

  test "should get set_history_and_mood" do
    get profile_services_set_history_and_mood_url
    assert_response :success
  end

  test "should get get_personal_details" do
    get profile_services_get_personal_details_url
    assert_response :success
  end

end
