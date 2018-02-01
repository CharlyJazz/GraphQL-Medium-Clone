FactoryBot.define do
  factory :post do
    association :user, factory: :user
    association :topic, factory: :topic
    
    sequence(:title) { |n| "Title #{n}" }
    sequence(:body) { |n| "Body #{n}" }    
    sequence(:picture) { |n| "Picture #{n}" }    
  end
end
