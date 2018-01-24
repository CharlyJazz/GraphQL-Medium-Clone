require File.expand_path('../../config/environment', __FILE__)

require 'rails/test_help'
require 'factory_bot'


class ActiveSupport::TestCase
  fixtures :all

  include FactoryBot::Syntax::Methods
end
