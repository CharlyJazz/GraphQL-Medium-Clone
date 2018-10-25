import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Color from 'color'
import { Link } from 'react-router-dom'

const BetterLink = Radium(Link) // https://github.com/FormidableLabs/radium/tree/master/docs/faq#why-doesnt-radium-work-on-react-routers-link-or-react-bootstraps-button-or-someothercomponent

const Anchor = props => {
  let styles = {
    base: {
      textDecoration: 'none',
      color: 'inherit',
      ":hover": {
				color: Color('#7743CE').alpha(0.5).darken(0.5)
			}
    }
  }

  return <BetterLink style={[styles.base]} to={props.href}> {props.children} </BetterLink>
}

Anchor.defaultProps = {
  href: '#'
}

Anchor.propTypes = {
  href: PropTypes.string,
  children: PropTypes.string.isRequired
}

export default Radium(Anchor)