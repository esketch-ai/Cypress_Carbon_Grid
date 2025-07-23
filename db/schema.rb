# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_07_23_083405) do
  create_table "alerts", force: :cascade do |t|
    t.string "alert_type"
    t.string "title"
    t.string "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "carbon_data", force: :cascade do |t|
    t.float "value"
    t.datetime "recorded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "global_metrics", force: :cascade do |t|
    t.float "reduction_rate"
    t.integer "active_projects"
    t.integer "trading_volume"
    t.integer "platform_users"
    t.float "data_quality"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "infrastructure_metrics", force: :cascade do |t|
    t.string "name"
    t.string "value"
    t.string "unit"
    t.string "change"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "municipalities", force: :cascade do |t|
    t.string "name"
    t.integer "population"
    t.integer "area"
    t.integer "carbon_emission", limit: 8
    t.float "reduction_target"
    t.float "current_reduction"
    t.integer "budget", limit: 8
    t.float "renewable_energy_rate"
    t.float "public_transport_rate"
    t.json "projects"
    t.json "sector_emissions"
    t.json "citizen_participation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "policy_effects", force: :cascade do |t|
    t.string "name"
    t.string "budget"
    t.string "reduction"
    t.string "efficiency"
    t.string "status"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end
end
