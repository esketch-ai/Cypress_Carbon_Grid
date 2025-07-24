class Api::V1::CorporateMetricsController < ApplicationController
  def index
    @corporate_metric = CorporateMetric.first # Assuming only one corporate metric record
    render json: @corporate_metric
  end
end