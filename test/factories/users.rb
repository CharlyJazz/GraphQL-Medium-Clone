FactoryBot.define do
  factory :user do
    sequence(:username) { |n| "person#{n}" }
    sequence(:email) { |n| "person#{n}@example.com" }
    first_name 'Charly'
    last_name 'Jazz'
    bio 'Bio'
    password '[omitted]'
    picture 'image.png'
  end
end