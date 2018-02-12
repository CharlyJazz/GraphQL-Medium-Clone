import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import ImportContactsIcon from 'material-ui-icons/ImportContacts';
import CommentIcon from 'material-ui-icons/Comment';
import ClapIcon from 'material-ui-icons/ThumbUp';
import CollectionIcon from 'material-ui-icons/Collections';
import BookmarkIcon from 'material-ui-icons/CollectionsBookmark';

const styles = {
  flex: {
    marginTop: '5%',
    marginBottom: '5%',
    display: 'flex'
  },
  countBox: {
    marginRight: '3%'
  },
  icon: {
    verticalAlign: 'top'
  }
};

const profileCounts = props => (
  <div className={props.classes.flex}>

    <div className={props.classes.countBox}>
      <Typography type="subheading">
      {props.posts}  <ImportContactsIcon className={props.classes.icon}/>
      </Typography>
    </div>

    <div className={props.classes.countBox}>
      <Typography type="subheading">
      {props.comments}  <CommentIcon className={props.classes.icon}/>
      </Typography>
    </div>

    <div className={props.classes.countBox}>
      <Typography type="subheading">
      {props.claps}  <ClapIcon className={props.classes.icon}/>
      </Typography>
    </div>

    <div className={props.classes.countBox}>
      <Typography type="subheading">
      {props.collections}  <CollectionIcon className={props.classes.icon}/>
      </Typography>
    </div>

    <div className={props.classes.countBox}>
      <Typography type="subheading">
      {props.bookmarks}  <BookmarkIcon className={props.classes.icon}/>
      </Typography>
    </div>

  </div>
)

profileCounts.propTypes = {
  classes: PropTypes.object.isRequired,
  posts: PropTypes.number,
  comments: PropTypes.number,
  claps: PropTypes.number,
  collections: PropTypes.number,
  bookmarks: PropTypes.number,
};

export default withStyles(styles)(profileCounts);
