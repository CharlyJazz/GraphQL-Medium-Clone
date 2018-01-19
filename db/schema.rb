# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180119175546) do

  create_table "bookmarks", force: :cascade do |t|
    t.integer "users_id"
    t.integer "posts_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["posts_id"], name: "index_bookmarks_on_posts_id"
    t.index ["users_id"], name: "index_bookmarks_on_users_id"
  end

  create_table "claps", force: :cascade do |t|
    t.integer "posts_id"
    t.integer "users_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["posts_id"], name: "index_claps_on_posts_id"
    t.index ["users_id"], name: "index_claps_on_users_id"
  end

  create_table "collections", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.string "picture"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_collections_on_user_id"
  end

  create_table "collections_posts", id: false, force: :cascade do |t|
    t.integer "post_id", null: false
    t.integer "collection_id", null: false
    t.index ["collection_id"], name: "index_collections_posts_on_collection_id"
    t.index ["post_id"], name: "index_collections_posts_on_post_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "body"
    t.integer "posts_id"
    t.integer "users_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["posts_id"], name: "index_comments_on_posts_id"
    t.index ["users_id"], name: "index_comments_on_users_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.string "picture"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "posts_tags", id: false, force: :cascade do |t|
    t.integer "tag_id", null: false
    t.integer "post_id", null: false
    t.index ["post_id"], name: "index_posts_tags_on_post_id"
    t.index ["tag_id"], name: "index_posts_tags_on_tag_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "picture"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
