class CreateCorporateMetrics < ActiveRecord::Migration[8.0]
  def change
    create_table :corporate_metrics do |t|
      t.json :esg_scores
      t.json :carbon_scope
      t.json :cbam_data
      t.json :supply_chain_data

      t.timestamps
    end
  end
end
