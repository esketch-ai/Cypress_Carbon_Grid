class CreateCarbonData < ActiveRecord::Migration[8.0]
  def change
    create_table :carbon_data do |t|
      t.float :value
      t.datetime :recorded_at

      t.timestamps
    end
  end
end
