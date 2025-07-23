require "test_helper"

class Api::V1::MunicipalitiesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_municipalities_index_url
    assert_response :success
  end
end
