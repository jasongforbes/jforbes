import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Transition from './slideTransition';
import celebrate from '../images/celebrate.svg';

const styles = theme => ({
  celebrateIcon: {
    alignSelf: 'center',
    height: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '300px',
  },
  thankYou: {
    width: '100%',
    maxWidth: '600px',
  },
});

const Subscribe = ({ classes, fullScreen, onClose, showSuccess, showSuccessShadow }) => (
  <Dialog
    open={showSuccess}
    keepMounted
    onClose={onClose}
    TransitionComponent={Transition}
    fullScreen={fullScreen}
    disableBackdropClick
    fullWidth
    BackdropProps={{ invisible: !showSuccessShadow }}
    PaperProps={{ elevation: showSuccessShadow ? 24 : 0 }}
  >
    <DialogContent className={classes.content}>
      <div>
        <Typography variant="h4">Thank You!</Typography>
        <Typography variant="caption">You have successfully subscribed.</Typography>
      </div>
      <div className={classes.celebrateIcon}>
        <img src={celebrate} alt="Celebration icon" width={100} />
      </div>
      <div /> {/* Empty div for centering */}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

Subscribe.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  fullScreen: PropTypes.bool,
  onClose: PropTypes.func,
  showSuccessShadow: PropTypes.bool,
  showSuccess: PropTypes.bool,
};

Subscribe.defaultProps = {
  fullScreen: false,
  onClose: () => {},
  showSuccessShadow: false,
  showSuccess: false,
};

export default withMobileDialog({ breakpoint: 'xs' })(withStyles(styles)(Subscribe));
