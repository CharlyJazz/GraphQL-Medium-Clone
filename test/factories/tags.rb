FactoryBot.define do
  factory :tag do
    sequence(:name) { |n| 
      "Name #{n}"
    }
  end
end
