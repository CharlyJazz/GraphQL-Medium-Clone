require 'jwt'

class AuthToken
  def self.key
    Rails.application.secrets.secret_key_base
  end

  def self.token(user)
    JWT.encode({user_id: user.id}, key, 'HS256', {'exp' => Time.now + 3600}) # 1 Hour
  end

  def self.verify(token)
    begin 
      payload, header = JWT.decode token, key, true, { :algorithm => 'HS256' }
      return nil if (header['exp'].nil? || Time.now > header['exp'])
      User.find_by(id: payload['user_id'])
    rescue JWT::DecodeError => e
      return nil
    end
  end
end