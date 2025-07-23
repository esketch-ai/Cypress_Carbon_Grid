class Api::V1::PolicyEffectsController < ApplicationController
  def index
    @policy_effects = PolicyEffect.all
    render json: @policy_effects
  end
end
