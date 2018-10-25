import React from 'react'
import PropTypes from 'prop-types'
import SignUpForm from '../../components/Forms/Authentication/SignUpForm'
import { checkValidity } from '../../shared/checkValidity'
import { updateObject } from '../../shared/updateObject'
import { graphql } from 'react-apollo'
import mutation from './mutation'

class SignUpContainer extends React.Component {
  state = {
    showPassword: false,
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
      },
      passwordRepeat: {
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
      },
      username: {
        value: '',
        validation: {
          required: true,
          minLength: 4
        },
        valid: false,
        touched: false,
        errors: {
          message: null
        }
      },
      first_name: {
        value: '',
        validation: {
          required: true,
          minLength: 1
        },
        valid: false,
        touched: false,
        errors: {
          message: null
        }
      },
      last_name: {
        value: '',
        validation: {
          required: true,
          minLength: 1
        },
        valid: false,
        touched: false,
        errors: {
          message: null
        }
      },
      bio: {
        value: '',
        validation: {
          required: true,
          minLength: 1
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
   * Change the showPassword state.
   */
  handleShowPasswordToggle = () => {
    this.setState((prevState) => {
      return {
        showPassword: !prevState.showPassword
      }
    })
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm = async (event) => {
    event.preventDefault()

    await this.props.createUser({
      variables: {
        username: this.state.controls.username.value,
        first_name: this.state.controls.first_name.value,
        last_name: this.state.controls.last_name.value,
        email: this.state.controls.email.value,
        password: this.state.controls.password.value,
        bio: this.state.controls.bio.value
      }
    }).then((response) => {
      this.props.clickedSwitchForm()
    }).catch((error) => {
      let arrayErrors = null
      if (error.graphQLErrors) {
        arrayErrors = error.graphQLErrors.map((err) => error.message)
      }
      this.props.onModalClose()
      console.log(arrayErrors) // TODO: Show error
    })
    
  }

  /**
   * Render the component.
   */
  render() {
    const passwordNoMatch = this.state.controls.password.value !== this.state.controls.passwordRepeat.value
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.inputChangedHandler}
        controls={this.state.controls}
        showPassword={this.state.showPassword}
        clickedShowPasswordToggle={this.handleShowPasswordToggle}
        clickedSwitchForm={this.props.clickedSwitchForm}
        passwordNoMatch={passwordNoMatch}
        disabled={
          (
            this.state.controls.password.errors.message       ||
            this.state.controls.passwordRepeat.errors.message ||
            this.state.controls.email.errors.message          ||
            this.state.controls.username.errors.message       ||
            this.state.controls.bio.errors.message            
          )
            ? true
            : (
                this.state.controls.password.value.length === 0       ||
                this.state.controls.passwordRepeat.value.length === 0 ||
                this.state.controls.email.value.length === 0          ||
                this.state.controls.username.value.length === 0       ||
                this.state.controls.bio.value.length === 0            ||
                passwordNoMatch
              )
              ? true
              : false
        }
      />
    )
  }
}

SignUpContainer.propTypes = {
  clickedSwitchForm: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired
}

export default graphql(mutation, {name: 'createUser'})(SignUpContainer)