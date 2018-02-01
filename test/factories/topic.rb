FactoryBot.define do
  factory :topic do
    sequence(:name) { |n| "Name #{n}" }
    sequence(:description) { |n| "Description #{n}" }
    sequence(:picture) { |n| "Picture #{n}" }
  end
end
