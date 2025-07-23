class Api::V1::GlobalMetricsController < ApplicationController
  def index
    @global_metrics = GlobalMetric.first # Assuming only one global metric record
    render json: @global_metrics
  end
end
