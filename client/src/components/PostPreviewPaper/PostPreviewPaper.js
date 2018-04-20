import React from 'react'
import Paper from "material-ui/Paper/Paper"
import PropTypes from 'prop-types'
import ImgResponsive from '../UI/ImageResponsive/ImageResponsive'
import PostPreviewFooter from './PostPreviewFooter/PostPreviewFooter'
import Typography from 'material-ui/Typography/Typography'
import Anchor from '../UI/Anchor/Anchor'

import './PostPreviewPaper.css'


const PostPreviewPaper = props => {
  const stylesArray = [
    props.classesPaper && props.classesPaper,
    'DontUseShadow',
    'PostPreviewPaper'
  ]

  let divTextStyle = {'textAlign': 'center'}

  if (props.textAlign === 'left') {
    divTextStyle['textAlign'] = 'left'
  } else if (props.textAlign === 'right') {
    divTextStyle['textAlign'] = 'right'
  }

  let divText = (
    <div style={divTextStyle}>
      <Typography type="title" paragraph={true}>
        {props.title}
      </Typography>
      {props.avatarObject === undefined && (
        <Typography type="subheading" color="textSecondary">
          <Anchor children={props.postedBy}/>
        </Typography>
        )
      }
    </div>
  )

  return (
    <Paper className={stylesArray.join(' ')}>
      
      {props.textFrom === 'top' ? divText : null}
      
      <div className='BoxImg'>
        <ImgResponsive img={props.imgUrl} alt={props.imgAlt}/>
      </div>

      {props.textFrom === 'bottom' ? divText : null}

      {props.avatarObject !== undefined && (
        <PostPreviewFooter
          imgAlt={props.avatarObject['imgAlt']}
          imgUrl={props.avatarObject['imgUrl']}
          postedBy={props.postedBy}/>
      )}
    </Paper>
  )
}

PostPreviewPaper.defaultProps = {
  textAlign: 'center',
  textFrom: 'top',
  imgUrl: 'https://cdn-images-1.medium.com/max/427/1*AUdzgoLMR_28CgeX_YTzXA.png',
  imgAlt: 'Image Alt'
}

PostPreviewPaper.propTypes = {
  textAlign: PropTypes.string,
  textFrom: PropTypes.string,
  postedBy: PropTypes.string.isRequired,
  avatarObject: PropTypes.object,
  title: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired
}

export default PostPreviewPaper