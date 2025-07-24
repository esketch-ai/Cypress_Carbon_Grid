class CreateAssociationMetrics < ActiveRecord::Migration[8.0]
  def change
    create_table :association_metrics do |t|
      t.json :member_data
      t.json :regional_performance
      t.json :activity_utilization

      t.timestamps
    end
  end
end
