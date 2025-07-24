class AddTotalEmissionsToGlobalMetrics < ActiveRecord::Migration[8.0]
  def change
    add_column :global_metrics, :total_emissions, :integer
  end
end
