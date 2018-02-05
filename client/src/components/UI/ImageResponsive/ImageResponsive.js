import React from 'react';

let style = { 
  width: '100%',
  maxWidth: '100%',
  height: 'auto'
}

const imgResponsive = props => (
  <img style={style} src={props.img} alt="props.alt" />
)

export default imgResponsive;