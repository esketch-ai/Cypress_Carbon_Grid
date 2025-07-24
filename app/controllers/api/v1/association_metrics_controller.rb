class Api::V1::AssociationMetricsController < ApplicationController
  def index
    @association_metric = AssociationMetric.first # Assuming only one association metric record
    render json: @association_metric
  end
end