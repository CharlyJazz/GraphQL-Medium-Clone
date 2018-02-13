import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button/Button';
import Typography from 'material-ui/Typography/Typography';
import Divider from 'material-ui/Divider/Divider';
import AccountBoxIcon from 'material-ui-icons/AccountBox';

const styles = theme => ({
  container: {
    boxShadow: 'none !important'
  },
  boxMarginTop: {
    marginTop: 20
  },
  formControl: {
    width: '100%'
  },
  swithFormButton: {
    marginTop: 10
  },
  cardContent: {
    width: '50%',
    margin: '0 auto'
  },
  icon: {
    verticalAlign: 'middle',
    fill: '#009688'
  }
});

let LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  classes
}) => (
  <Card className={classes.container}>
    <CardContent className={classes.cardContent}>
      <form action="/" onSubmit={onSubmit} className={classes.form}>

        <Typography type="title" color="primary" gutterBottom>
          Login
        </Typography> 

        <AccountBoxIcon className={classes.icon}/>

        <Typography type="body2" color="secondary" gutterBottom>
          {errors.summary && <p className="error-message">{errors.summary}</p>}
        </Typography> 

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="email-input">Email</InputLabel>
          <Input id="email-input" value={user.email} onChange={onChange} type="email"/>
          {errors.email && 
            <FormHelperText id="email-input-text">errors.email</FormHelperText>
          }
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <Input id="password-input" value={user.password} onChange={onChange} type="password" />
          {errors.password && 
            <FormHelperText id="password-input-text">errors.password</FormHelperText>
          }
        </FormControl>

        <div className={classes.boxMarginTop}>
          <Button raised color="primary" type="submit">
            Log in
          </Button>
        </div>
      </form>
    </CardContent>
    <Divider/>
    <div className={classes.boxMarginTop}>
      <Typography type="body1" color="inherit">
      Don't have an account?  
      </Typography>
      <Button raised color="secondary" size="small" className={classes.swithFormButton}>
        Create one
      </Button>
    </div>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);