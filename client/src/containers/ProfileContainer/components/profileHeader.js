import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import Avatar from 'material-ui/Avatar/Avatar';

const styles = {
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 90,
    height: 90,
  },
  flex: {
    display: 'flex'
  },
  userInfo: {
    flex: '1 1 100%'
  },
  borderAvatar: {
    border: '5px solid #00968854'
  }
};

const profileHeader = props => (
  <div className={props.classes.flex}>
    <div className={props.classes.userInfo}>
      <Typography type="title" gutterBottom>
      { props.userName }
      </Typography>
      <Typography type="subheading" gutterBottom>
        { props.userBio }
      </Typography>
    </div>
    <div>
      <Avatar
        alt={ `${props.userName} profile image` }
        src={ props.imgUrl }
        className={[
          props.classes.avatar,
          props.classes.bigAvatar,
          props.classes.borderAvatar
        ].join(' ')}/>
    </div>
  </div>
);

profileHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  imgUrl: PropTypes.string,
  userBio: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

profileHeader.defaultProps = {
  imgUrl: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg',
}

export default withStyles(styles)(profileHeader);