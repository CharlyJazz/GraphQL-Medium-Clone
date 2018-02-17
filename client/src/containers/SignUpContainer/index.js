import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from '../../components/Forms/Authentication/SignUpForm';

class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: '',
        passwordRepeat: '',
        bio: '',
        image: ''
      },
      showPassword: false
    };
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser = (event) => {
    const user = {...this.state.user};
    user[event.target.name] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Change the showPassword state.
   */
  handleShowPasswordToggle = () => {
    this.setState((prevState) => {
      return {
        showPassword: !prevState.showPassword
      }
    });
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    console.log('name:', this.state.user.name);
    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);
    console.log('passwordRepeat:', this.state.user.passwordConfirmation);
    console.log('bio:', this.state.user.bio);
    console.log('image:', this.state.user.image);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        showPassword={this.state.showPassword}
        clickedShowPasswordToggle={this.handleShowPasswordToggle}
        clickedSwitchForm={this.props.clickedSwitchForm}
      />
    );
  }
}

SignUpContainer.propTypes = {
  clickedSwitchForm: PropTypes.func.isRequired
}

export default SignUpContainer;