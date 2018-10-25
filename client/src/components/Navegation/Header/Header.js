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
import { Divider } from 'material-ui'
import Anchor from '../../UI/Anchor/Anchor'


const styles = theme => ({
  root: {
    width: '100%',
  },
  brandBlock: {
    flex: 1,
  },
  brand: {
    cursor: 'pointer',
    display: 'inline'
  },
  button: {
    margin: theme.spacing.unit,
  }
})

class Header extends Component {
  state = {
    showSearchInput: false,
    anchorEl: null,
    modalIsOpen: false,
    showSignInOrSignUp: true,
    logoutBegin: false
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

  handleLogout = () => {
    this.setState({
      anchorEl: null,
      logoutBegin: true
    }, () => this.props.history.push(`/logout`))
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
      modalIsOpen: true,
      showSignInOrSignUp: showSignInOrSignUp
    })
  }

  handleModalClosed = () => {
    this.setState({ modalIsOpen: false })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentUser && nextProps.currentUser.token !== this.props.currentUser.token) {
      this.setState({ logoutBegin: false })
    }
  }

  render() {
    const {
      classes,
      currentUser,
      loading
    } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    let isAuth = false

    if (!loading &&
      currentUser &&
      currentUser.token &&
      currentUser.username &&
      currentUser.id) {
      isAuth = true
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className="DontUseShadow">
          <Toolbar>
            <div className={classes.brandBlock}>
              <Typography
                onClick={this.handleClickBrand}
                className={classes.brand}
              >
                AppStories
              </Typography>
            </div>
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
                      <Anchor href={`/profile/${this.props.currentUser.username}`}>
                        <MenuItem>
                          Profile
                      </MenuItem>
                      </Anchor>
                      <Anchor href={'/write/post/'}>
                        <MenuItem>
                          New Stories
                      </MenuItem>
                      </Anchor>
                      <Anchor href={'/me/posts/'}>
                        <MenuItem>
                          My Stories
                    </MenuItem>
                      </Anchor>
                      <Anchor href={'/me/collections'}>
                        <MenuItem>
                          My Collections
                      </MenuItem>
                      </Anchor>
                      <Anchor href={'/me/bookmarks'}>
                        <MenuItem>
                          My Bookmarks
                      </MenuItem>
                      </Anchor>
                      <Divider />
                      <MenuItem onClick={this.handleLogout} disabled={this.state.logoutBegin}>Logout</MenuItem>
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
  currentUser: PropTypes.object
}

export default withRouter(withStyles(styles)(Header))
