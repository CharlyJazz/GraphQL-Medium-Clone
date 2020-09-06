class AuthenticationMailer < ActionMailer::Base
  default from: ENV['MAIL_ADDRESS']

  def recover_password_response(user)
    @user = user
    mail(to: @user.email, subject: 'GraphQL Medium Clone - Refresh Password Token')
  end

  def updated_password_response(user)
    @user = user
    mail(to: @user.email, subject: 'GraphQL Medium Clone - Password Updated Successfully')
  end
end
