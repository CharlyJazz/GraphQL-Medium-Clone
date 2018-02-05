import React from 'react';
import Paper from "material-ui/Paper/Paper";
import PropTypes from 'prop-types';
import ImgResponsive from '../UI/ImageResponsive/ImageResponsive';
import PostPreviewFooter from './PostPreviewFooter/PostPreviewFooter';

const PostPreviewPaper = props => {
  const stylesArray = [props.classesPaper && props.classesPaper, 'DontUseShadow'];

  let divTextStyle = {'textAlign': 'center'};

  if (props.textAlign === 'left') {
    divTextStyle['textAlign'] = 'left';
  } else if (props.textAlign === 'right') {
    divTextStyle['textAlign'] = 'right';
  }

  let divText = (
    <div style={divTextStyle}>
      <h3>
        I Got Chipped: A Dispatch From The Frontier Of Wearable Tech
      </h3>
      {props.avatarObject === undefined && (
          <a>
            Carlos Author Azuaje | Feb 4
          </a>  
        )
      }
    </div>
  )

  return (
    <Paper className={stylesArray.join(' ')}>
      
      {props.textFrom === 'top' ? divText : null}
      
      <figure>
        <ImgResponsive img={props.imgUrl} alt={props.imgAlt}/>
      </figure>

      {props.textFrom === 'bottom' ? divText : null}

      {props.avatarObject !== undefined && (
        <PostPreviewFooter
          imgAlt={props.avatarObject['imgAlt']}
          imgUrl={props.avatarObject['imgUrl']}/>
      )}
    </Paper>
  )
}

PostPreviewPaper.defaultProps = {
  textAlign: 'center',
  textFrom: 'top',
  imgUrl: 'https://cdn-images-1.medium.com/max/427/1*AUdzgoLMR_28CgeX_YTzXA.png',
  imgAlt: 'Image Alt'
};

PostPreviewPaper.propTypes = {
  textAlign: PropTypes.string,
  textFrom: PropTypes.string,
  avatarObject: PropTypes.object
}

export default PostPreviewPaper;