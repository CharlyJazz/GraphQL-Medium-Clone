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

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  classes,
  showPassword,
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

        <Typography type="body2" color="secondary" gutterBottom>
          {errors.summary && <p className="error-message">{errors.summary}</p>}
        </Typography> 

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-input">Write your Username</InputLabel>
          <Input 
            id="name-input" 
            name="name" 
            value={user.name} 
            onChange={onChange} 
            type="text"
          />
          {errors.name && 
            <FormHelperText id="name-input-text">{errors.name}</FormHelperText>
          }
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="email-input">Write your email</InputLabel>
          <Input 
            id="email-input" 
            name="email" 
            value={user.email} 
            onChange={onChange} 
            type="email"
          />
          {errors.email && 
            <FormHelperText id="email-input-text">{errors.email}</FormHelperText>
          }
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="bio-input">Write a short bio</InputLabel>
          <Input
            id="bio-input"
            name="bio"
            value={user.bio}
            onChange={onChange}
            type="text"
          />
          {errors.bio && 
            <FormHelperText id="bio-input-text">{errors.bio}</FormHelperText>
          }
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password-input">Write your Password</InputLabel>
          <Input
            id="password-input"
            name="password"
            value={user.password}
            onChange={onChange}
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
          {errors.password && 
            <FormHelperText id="password-input-text">{errors.password}</FormHelperText>
          }
        </FormControl>
        
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="passwordRepeat-input">Repeat the Password</InputLabel>
          <Input
            id="passwordRepeat-input" 
            name="passwordRepeat" 
            value={user.passwordRepeat} 
            onChange={onChange} 
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
          {errors.passwordRepeat && 
            <FormHelperText id="passwordRepeat-input-text">{errors.passwordRepeat}</FormHelperText>
          }
        </FormControl>

        <div className={classes.boxMarginTop}>
          <Button raised color="primary" type="submit">
            Create account
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
        Sign In
      </Button>
    </div>
  </Card>
)

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  showPassword: PropTypes.bool.isRequired,
  clickedShowPasswordToggle: PropTypes.func.isRequired,
  clickedSwitchForm: PropTypes.func.isRequired
}

export default withStyles(stylesBase)(SignUpForm)