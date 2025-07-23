class CreatePolicyEffects < ActiveRecord::Migration[8.0]
  def change
    create_table :policy_effects do |t|
      t.string :name
      t.string :budget
      t.string :reduction
      t.string :efficiency
      t.string :status
      t.text :description

      t.timestamps
    end
  end
end
