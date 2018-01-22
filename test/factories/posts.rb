FactoryBot.define do
  factory :post do
    association :user, factory: :user
    
    title "MyText"
    body "MyText"
    picture "MyText"
  end
end
