import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium'
import Color from 'color'

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

  return (
    <a style={[styles.base]} href={props.href}> {props.children} </a>
  )
}

Anchor.defaultProps = {
  href: '#'
}

Anchor.propTypes = {
  href: PropTypes.string,
  children: PropTypes.string.isRequired
}

export default Radium(Anchor);