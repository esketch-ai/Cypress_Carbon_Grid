class CreateInfrastructureMetrics < ActiveRecord::Migration[8.0]
  def change
    create_table :infrastructure_metrics do |t|
      t.string :name
      t.string :value
      t.string :unit
      t.string :change
      t.text :description

      t.timestamps
    end
  end
end
