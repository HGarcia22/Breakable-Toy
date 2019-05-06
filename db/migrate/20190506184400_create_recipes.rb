class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.string :title, null: false
      t.string :ready_time, null: false, numericality: true
      t.string :image, null: false
    end
  end
end
