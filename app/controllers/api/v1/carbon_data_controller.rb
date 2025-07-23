class Api::V1::CarbonDataController < ApplicationController
  def index
    @carbon_data = CarbonData.all.order(recorded_at: :asc)
    render json: @carbon_data
  end
end
