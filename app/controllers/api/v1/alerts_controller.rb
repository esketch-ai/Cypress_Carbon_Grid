class Api::V1::AlertsController < ApplicationController
  def index
    @alerts = Alert.all.order(created_at: :desc)
    render json: @alerts
  end
end
