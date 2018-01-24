FactoryBot.define do
  factory :collection do
    association :user, factory: :user

    title "MyText"
    description "MyText"
    picture "MyText"
  end
end
