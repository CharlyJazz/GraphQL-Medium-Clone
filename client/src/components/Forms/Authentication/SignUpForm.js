import React from 'react'
import PropTypes from 'prop-types'
import Card, { CardContent } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Button from 'material-ui/Button/Button'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography/Typography'
import Divider from 'material-ui/Divider/Divider'
import AccountBoxIcon from 'material-ui-icons/AccountBox'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
import stylesBase from './Styles/stylesBase'
import red from 'material-ui/colors/red'

const SignUpForm = ({
  onSubmit,
  onChange,
  controls,
  classes,
  showPassword,
  disabled,
  passwordNoMatch,
  clickedShowPasswordToggle,
  clickedSwitchForm
}) => (
  <Card className={classes.container}>
    <CardContent className={classes.cardContent}>
      <form action="/" onSubmit={onSubmit} className={classes.form}>

        <Typography type="title" color="primary" gutterBottom>
          Register
        </Typography> 

        <AccountBoxIcon className={classes.icon}/>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="username-input">Write your username</InputLabel>
          <Input 
            id="username-input" 
            name="username" 
            value={controls.username.value} 
            onChange={(event) => onChange(event, 'username')} 
            type="text"
          />
          {controls.username.errors.message && 
            <FormHelperText id="username-input-text" style={{color: red[500]}}>
              {controls.username.errors.message}
            </FormHelperText>
          }
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="firstname-input">Write your first name</InputLabel>
          <Input 
            id="firstname-input" 
            name="firstname" 
            value={controls.first_name.value} 
            onChange={(event) => onChange(event, 'first_name')} 
            type="text"
          />
          {controls.first_name.errors.message && 
            <FormHelperText id="firstname-input-text" style={{color: red[500]}}>
              {controls.first_name.errors.message}
            </FormHelperText>
          }
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="firstname-input">Write your first name</InputLabel>
          <Input 
            id="lastname-input" 
            name="lastname" 
            value={controls.last_name.value} 
            onChange={(event) => onChange(event, 'last_name')} 
            type="text"
          />
          {controls.last_name.errors.message && 
            <FormHelperText id="lastname-input-text" style={{color: red[500]}}>
              {controls.last_name.errors.message}
            </FormHelperText>
          }
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="email-input">Write your email</InputLabel>
          <Input 
            id="email-input" 
            name="email" 
            value={controls.email.value} 
            onChange={(event) => onChange(event, 'email')} 
            type="email"
          />
          {controls.email.errors.message && 
            <FormHelperText id="email-input-text" style={{color: red[500]}}>
              {controls.email.errors.message}
            </FormHelperText>
          }
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="bio-input">Write a short bio</InputLabel>
          <Input
            id="bio-input"
            name="bio"
            value={controls.bio.value}
            onChange={(event) => onChange(event, 'bio')} 
            type="text"
          />
          {controls.bio.errors.message && 
            <FormHelperText id="bio-input-text" style={{color: red[500]}}>
              {controls.bio.errors.message}
            </FormHelperText>
          }
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password-input">Write your Password</InputLabel>
          <Input
            id="password-input"
            name="password"
            value={controls.password.value}
            onChange={(event) => onChange(event, 'password')} 
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={clickedShowPasswordToggle}
                  onMouseDown={(event) => (event.preventDefault)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {controls.password.errors.message && 
            <FormHelperText id="password-input-text" style={{color: red[500]}}>
              {controls.password.errors.message}
            </FormHelperText>
          }
        </FormControl>
        
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="passwordRepeat-input">Repeat the Password</InputLabel>
          <Input
            id="passwordRepeat-input" 
            name="passwordRepeat" 
            value={controls.passwordRepeat.value} 
            onChange={(event) => onChange(event, 'passwordRepeat')} 
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={clickedShowPasswordToggle}
                  onMouseDown={(event) => (event.preventDefault)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {controls.passwordRepeat.errors.message && 
            <FormHelperText id="passwordRepeat-input-text" style={{color: red[500]}}>
              {controls.passwordRepeat.errors.message}
            </FormHelperText>
          }
        </FormControl>

        <div className={classes.boxMarginTop}>
          <Button raised color="primary" type="submit" disabled={disabled}>
            { 
              disabled 
                ? passwordNoMatch
                  ? 'The password no match'
                  : 'Fill fields with correct data' 
                : 'Create your new Account!' 
            }
          </Button>
        </div>

      </form>
    </CardContent>
    <Divider/>
    <div className={classes.boxMarginTop}>
      <Typography type="body1" color="inherit">
        You have an account?  
      </Typography>
      <Button
        raised
        color="secondary" 
        size="small" 
        className={classes.swithFormButton}
        onClick={clickedSwitchForm}>
        Go to Sign In
      </Button>
    </div>
  </Card>
)

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  controls: PropTypes.object.isRequired,
  showPassword: PropTypes.bool.isRequired,
  passwordNoMatch: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  clickedShowPasswordToggle: PropTypes.func.isRequired,
  clickedSwitchForm: PropTypes.func.isRequired
}

export default withStyles(stylesBase)(SignUpForm)