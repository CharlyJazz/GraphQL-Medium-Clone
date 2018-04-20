import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from '../../components/Forms/Authentication/LoginForm'

class LoginContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    }
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm = (event) => {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault()

    console.log('email:', this.state.user.email)
    console.log('password:', this.state.user.password)
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser = (event) => {
    const user = {...this.state.user}
    user[event.target.name] = event.target.value

    this.setState({
      user
    }, () => console.log(user))
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        clickedSwitchForm={this.props.clickedSwitchForm}
      />
    )
  }
}

LoginContainer.propTypes = {
  clickedSwitchForm: PropTypes.func.isRequired
}

export default LoginContainer