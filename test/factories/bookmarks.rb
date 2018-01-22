FactoryBot.define do
  factory :bookmark do
    association :user, factory: :user
    association :post, factory: :post
  end
end
