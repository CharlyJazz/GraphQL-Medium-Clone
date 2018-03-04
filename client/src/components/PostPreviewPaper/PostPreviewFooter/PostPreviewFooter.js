import React from 'react'
import Avatar from 'material-ui/Avatar'
import BookmarkBorder from 'material-ui-icons/BookmarkBorder'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Typography from 'material-ui/Typography/Typography'

import './PostPreviewFooter.css'
import Anchor from '../../UI/Anchor/Anchor'


const PostPreviewFooter = props => (
  <div className='PostPreviewFooter'>
    <div className='AvatarBox'>
      <Avatar alt={props.imgAlt} src={props.imgUrl}/>
    </div>
    <div className='UserBox'>
      <Typography type="subheading" color="inherit">
        <Anchor children={props.postedBy} kind="primary"/>
      </Typography>
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

export default PostPreviewFooter