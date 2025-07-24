require "test_helper"

class Api::V1::AssociationMetricsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_association_metrics_index_url
    assert_response :success
  end
end
