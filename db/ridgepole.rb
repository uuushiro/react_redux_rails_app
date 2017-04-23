create_table "todos", force: :cascade do |t|
  t.text :text
  t.boolean :completed, null: false, default: false
  t.timestamps
end

