class CreateAlerts < ActiveRecord::Migration[8.0]
  def change
    create_table :alerts do |t|
      t.string :alert_type
      t.string :title
      t.string :message
      

      t.timestamps
    end
  end
end
