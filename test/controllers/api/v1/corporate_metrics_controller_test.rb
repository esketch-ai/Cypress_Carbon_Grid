require "test_helper"

class Api::V1::CorporateMetricsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_corporate_metrics_index_url
    assert_response :success
  end
end
