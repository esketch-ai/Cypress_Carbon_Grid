class Api::V1::MunicipalitiesController < ApplicationController
  def index
    @municipalities = Municipality.all
    render json: @municipalities
  end
end