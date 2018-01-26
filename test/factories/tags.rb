FactoryBot.define do
  factory :tag do
    sequence(:name) { |n| 
      "Name #{n}"
    }
    sequence(:description) { |n| 
      "Description #{n}"
    }    
  end
end
