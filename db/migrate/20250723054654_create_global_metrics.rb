class CreateGlobalMetrics < ActiveRecord::Migration[8.0]
  def change
    create_table :global_metrics do |t|
      t.float :reduction_rate
      t.integer :active_projects
      t.integer :trading_volume
      t.integer :platform_users
      t.float :data_quality

      t.timestamps
    end
  end
end
