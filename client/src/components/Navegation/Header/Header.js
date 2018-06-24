import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
import IconButton from 'material-ui/IconButton'
import Search from 'material-ui-icons/Search'
import AccountCircle from 'material-ui-icons/AccountCircle'
import PropTypes from 'prop-types'
import InputSearch from './InputSearch/InputSearch'
import { withRouter } from 'react-router-dom'
import ModalMotion from '../../ModalMotion/ModalMotion'
import LoginContainer from '../../../containers/LoginContainer'
import SignUpContainer from '../../../containers/SignUpContainer'
import { graphql } from 'react-apollo'
import { GET_CURRENT_USER } from '../../../apollo/clientQueries'

const styles = theme => ({
  root: {
    width: '100%',
  },
  brand: {
    flex: 1,
    cursor: 'pointer'
  },
  button: {
    margin: theme.spacing.unit,
  },
})

class Header extends Component {
  state = {
    showSearchInput: false,
    anchorEl: null,
    modalIsOpen: false,
    showSignInOrSignUp: true
  }

  handleToggleSearch = () => {
    this.setState((prevState) => {
      return {
        showSearchInput: !prevState.showSearchInput
      }
    })
  }

  handleUserMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleUserMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  handleClickBrand = () => {
    this.props.history.push('/')
  }

  handleSwitchForm = () => {
    this.setState((prevState) => {
      return {
        showSignInOrSignUp: !prevState.showSignInOrSignUp
      }
    })
  }

  handleModalOpen = (showSignInOrSignUp) => {
    /*
    * Open Modal with a form
    * SignIn -> true
    * SignUp -> false
    */
    this.setState({
       modalIsOpen: true ,
       showSignInOrSignUp: showSignInOrSignUp
    })
  }

  handleModalClosed = () => {
    this.setState({ modalIsOpen: false })
  }

  render () {
    const { classes } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    let isAuth = false

    if (!this.props.loading &&
        this.props.user &&
        this.props.user.token &&
        this.props.user.username &&
        this.props.user.id) {
      isAuth = true
    }

    console.log(this.props)

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className="DontUseShadow">
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.brand} onClick={this.handleClickBrand}>
              AppStories
            </Typography>
            {this.state.showSearchInput && <InputSearch />}
            <IconButton
              onClick={this.handleToggleSearch}
              color="inherit">
              <Search />
            </IconButton>
            {
              isAuth ? 
                (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleUserMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleUserMenuClose}
                  >
                    <MenuItem onClick={this.handleUserMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleUserMenuClose}>Posts</MenuItem>
                    <MenuItem onClick={this.handleUserMenuClose}>Collections</MenuItem>
                    <MenuItem onClick={this.handleUserMenuClose}>Logout</MenuItem>
                  </Menu>
                </div>
              )
              : 
              (
                <React.Fragment>
                  <Button
                    color="inherit" 
                    className={classes.button}
                    onClick={() => this.handleModalOpen(true)}>
                    Sign In
                  </Button>
                  <Button
                    raised
                    color="primary" 
                    className={classes.button}
                    onClick={() => this.handleModalOpen(false)}>
                    Get started
                  </Button>
                </React.Fragment>
              )
            }
          </Toolbar>
        </AppBar>

        <ModalMotion
          show={this.state.modalIsOpen}
          closed={this.handleModalClosed}>
          {
            this.state.showSignInOrSignUp 
              ? <LoginContainer 
                  clickedSwitchForm={this.handleSwitchForm}
                  onModalClose={this.handleModalClosed}
                />
              : <SignUpContainer
                  clickedSwitchForm={this.handleSwitchForm}
                  onModalClose={this.handleModalClosed}
                />
          }
        </ModalMotion>
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default graphql(GET_CURRENT_USER, {
  props: ({data: { loading, currentUser, refetch } }) => ({
    loading: loading,
    user: currentUser,
    refetch: refetch,
  })
})(
  withRouter(withStyles(styles)(Header))
)