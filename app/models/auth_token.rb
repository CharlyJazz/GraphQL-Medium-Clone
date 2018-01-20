require 'jwt'

class AuthToken
  def self.key
    Rails.application.secrets.secret_key_base
  end

  def self.token(user)
    payload = {user_id: user.id}
    JWT.encode payload, key, 'HS256', {'exp' => Time.now + 3600} # 1 Hour
  end

  def self.verify(token)
    begin
      payload, header = JWT.decode token, key, true, { :algorithm => 'HS256' }
      return nil if header['exp'].nil?
      return nil if Time.now > Time.at(@exp.to_i)
      User.find_by(id: payload['user_id'])
    rescue JWT::ExpiredSignature
      return nil
    end
  end
end