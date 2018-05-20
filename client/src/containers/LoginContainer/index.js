import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from '../../components/Forms/Authentication/LoginForm'
import { checkValidity } from '../../shared/checkValidity'
import { updateObject } from '../../shared/updateObject'
import { graphql } from 'react-apollo'

class LoginContainer extends React.Component {
  state = {
    controls: {
        email: {
            value: '',
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
            value: '',
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
  inputChangedHandler = ( event, controlName ) => {
    const updatedControls = updateObject( this.state.controls, {
        [controlName]: updateObject( this.state.controls[controlName], {
            value: event.target.value,
            valid: checkValidity( event.target.value, this.state.controls[controlName].validation )[0],
            touched: true,
            errors: {
              message: checkValidity( event.target.value, this.state.controls[controlName].validation )[0]
                ? null
                : checkValidity( event.target.value, this.state.controls[controlName].validation )[1]
            }
        })
    })

    this.setState( { controls: updatedControls } )
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm = (event) => {
    event.preventDefault()

  }

  /**
   * Render the component.
   */
  render() {
    return (
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
              : false
        }
      />
    )
  }
}

LoginContainer.propTypes = {
  clickedSwitchForm: PropTypes.func.isRequired
}

export default LoginContainer