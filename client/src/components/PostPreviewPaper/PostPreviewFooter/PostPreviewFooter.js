import React from 'react';
import Avatar from 'material-ui/Avatar';
import BookmarkBorder from 'material-ui-icons/BookmarkBorder';
import ExpandMore from 'material-ui-icons/ExpandMore';

import './PostPreviewFooter.css';


const PostPreviewFooter = props => (
  <div className='PostPreviewFooter'>
    <div className='AvatarBox'>
      <Avatar alt={props.imgAlt} src={props.imgUrl}/>
    </div>
    <div className='UserBox'>
      <span>Kris Cage</span>
    </div>
    <div className='BookmarkBox'>
      <div>
        <BookmarkBorder />
      </div>
      <div>
        <ExpandMore />
      </div>  
    </div>
  </div>
)

export default PostPreviewFooter;