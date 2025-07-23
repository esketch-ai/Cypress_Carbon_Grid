class Api::V1::InfrastructureMetricsController < ApplicationController
  def index
    @infrastructure_metrics = InfrastructureMetric.all
    render json: @infrastructure_metrics
  end
end
