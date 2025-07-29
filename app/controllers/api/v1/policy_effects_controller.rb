class Api::V1::PolicyEffectsController < ApplicationController
  def index
    @policy_effects = PolicyEffect.all

    if stale?(last_modified: @policy_effects.maximum(:updated_at))
      render json: @policy_effects
    end
  end
end
