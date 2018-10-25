import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from '../../components/Forms/Authentication/LoginForm'
import { checkValidity } from '../../shared/checkValidity'
import { updateObject } from '../../shared/updateObject'
import { graphql, compose } from 'react-apollo'
import { SET_CURRENT_USER } from '../../apollo/clientMutations'
import LOGIN_USER from './mutation'
import setCurrentUserLocalStorage from '../../shared/setCurrentUser'
import { Grow, Typography } from 'material-ui'

class LoginContainer extends React.Component {
  state = {
    loading: false,
    success: false,
    controls: {
      email: {
        value: 'carlosjazzc1@gmail.com',
        validation: {
          required: true,
          isEmail: true,
          minLength: 3
        },
        valid: false,
        touched: false,
        errors: {
          message: null
        }
      },
      password: {
        value: '12341234', // TODO: TEMPORAL VALOR
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
        errors: {
          message: null
        }
      }
    }
  }

  /**
   * Validate a set input value in the state
   *
   * @param {object} event - the JavaScript event object
   * @param {string} controlName - then name of the field to search in controls state e.g: email
   */
  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation)[0],
        touched: true,
        errors: {
          message: checkValidity(event.target.value, this.state.controls[controlName].validation)[0]
            ? null
            : checkValidity(event.target.value, this.state.controls[controlName].validation)[1]
        }
      })
    })

    this.setState({ controls: updatedControls })
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm = (event) => {
    event.preventDefault()
    this.setState({
      loading: true
    }, async () => {
      await this.props.signInUser({
        variables: {
          email: this.state.controls.email.value,
          password: this.state.controls.password.value
        }
      }).then((response) => {
        console.log('[Login Success]', response)
        // Save User Data and Token in the Local Storage
        const currentUserObject = {
          id: response.data.signInUser.user.id,
          token: response.data.signInUser.token,
          username: response.data.signInUser.user.username,
          picture: response.data.signInUser.user.picture
        }
        // Save Current User in the local storage
        setCurrentUserLocalStorage(currentUserObject)
        // Show success message
        this.setState({
          success: true,
          username: response.data.signInUser.user.username
        })
        // Set Current User data in the Apollo Cache
        this.props.setCurrentUser({
          variables: currentUserObject
        })
        // Close modal
        setTimeout(() => {
          this.props.onModalClose()
        }, 500);
      }).catch((error) => {
        console.log(error)
        let arrayErrors = null
        if (error.graphQLErrors) {
          arrayErrors = error.graphQLErrors.map((err) => error.message)
        }
        console.log(arrayErrors) // TODO: Show error
      })
    })
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <React.Fragment>
        <Grow in={!this.state.success}>
          <LoginForm
            onSubmit={this.processForm}
            onChange={this.inputChangedHandler}
            controls={this.state.controls}
            clickedSwitchForm={this.props.clickedSwitchForm}
            disabled={
              (this.state.controls.password.errors.message || this.state.controls.email.errors.message)
                ? true
                : (this.state.controls.password.value.length === 0 || this.state.controls.email.value.length === 0)
                  ? true
                  : this.state.loading
                    ? true
                    : false
            }
          />
        </Grow>
      </React.Fragment>
    )
  }
}

LoginContainer.propTypes = {
  clickedSwitchForm: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired
}

export default compose(
  graphql(SET_CURRENT_USER, {
    name: 'setCurrentUser'
  }),
  graphql(LOGIN_USER, {
    name: 'signInUser'
  })
)(LoginContainer)