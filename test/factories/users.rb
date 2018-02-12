FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "person#{n}" }
    sequence(:email) { |n| "person#{n}@example.com" }    
    bio "Bio"
    password "[omitted]"
    picture "image.png"
  end
end