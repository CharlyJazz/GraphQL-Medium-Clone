import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import CSSTransition from "react-transition-group/CSSTransition";
import './ModalMotion.css';
import Modal from 'material-ui/Modal/Modal';

const animationTiming = {
  enter: 400,
  exit: 1000
};

/**
 * Modal with transitions
 */
const ModalMotion = props => {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        open={props.show}
        onClose={props.closed}
      >
        <CSSTransition 
          mountOnEnter 
          unmountOnExit 
          in={props.show} 
          timeout={animationTiming}
          classNames={{
              enter: '',
              enterActive: '',
              exit: '',
              exitActive: 'ModalMotionClosed'
          }}>
          <div className='ModalMotion'>
            { props.title && (
              <Typography variant="title" id="modal-title">
                { props.title }
              </Typography>
            )}
            {props.children}
          </div>
        </CSSTransition>
      </Modal>
    )
}

ModalMotion.proptypes = {
  title: PropTypes.string,
  show: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default ModalMotion;