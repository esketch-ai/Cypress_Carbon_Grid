class CreateMunicipalities < ActiveRecord::Migration[8.0]
  def change
    create_table :municipalities do |t|
      t.string :name
      t.integer :population
      t.integer :area
      t.integer :carbon_emission, limit: 8
      t.float :reduction_target
      t.float :current_reduction
      t.integer :budget, limit: 8
      t.float :renewable_energy_rate
      t.float :public_transport_rate
      t.json :projects
      t.json :sector_emissions
      t.json :citizen_participation

      t.timestamps
    end
  end
end
