FactoryBot.define do
  factory :collection do
    association :user, factory: :user

    sequence(:title) { |n| "Title #{n}" }
    sequence(:description) { |n| "Description #{n}" }
    sequence(:picture) { |n| "Picture #{n}" }
  end
end
