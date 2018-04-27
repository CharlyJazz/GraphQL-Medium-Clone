FactoryBot.define do
  factory :comment do
    association :user, factory: :user
    association :post, factory: :post

    body "The pet"
  end
end
