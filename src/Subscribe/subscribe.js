import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const styles = theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '300px',
  },
  error: {
    color: theme.palette.error.dark,
  },
  input: {
    borderRadius: 3,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #c9c9c9',
    padding: '0 0.4em',
    margin: '0 0 8px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    'label + &': {
      marginTop: theme.spacing.unit * 4,
    },
    '&:focus': {
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
    },
    minHeight: '36px',
    minWidth: '50px',
    width: '100%',
  },
  inputError: {
    border: `1px solid ${theme.palette.error.dark}`,
    boxShadow: `0 0 0 1px ${theme.palette.error.dark}`,
  },
  form: {
    width: '100%',
  },
  formLabel: {
    fontWeight: 'bold',
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const Subscribe = ({
  classes,
  buttonClassName,
  contained,
  fullScreen,
  hasError,
  onClose,
  onSubmit,
  onSubscribe,
  showSubscribe,
}) => {
  const form = React.createRef();
  const emailInput = React.createRef();

  return (
    <React.Fragment>
      <Button
        className={buttonClassName}
        onClick={onSubscribe}
        variant={contained ? 'contained' : 'text'}
        color={contained ? 'primary' : 'default'}
        aria-label="subscribe"
      >
        <Typography variant="button" color={contained ? 'secondary' : 'primary'}>
          Subscribe
        </Typography>
      </Button>
      <Dialog
        open={showSubscribe}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        fullScreen={fullScreen}
      >
        <DialogContent className={classes.content}>
          <div>
            <Typography variant="h4">Never Miss an Update</Typography>
            <Typography variant="caption">
              <strong>No spam, ever.</strong> We&#39;ll never share your email address and you can
              opt out at any time.
            </Typography>
          </div>
          <FormControl className={classes.form}>
            <InputLabel shrink>
              <Typography variant="h4" className={classes.formLabel}>
                Email Address
              </Typography>
            </InputLabel>
            <input
              className={hasError ? `${classes.input} ${classes.inputError}` : classes.input}
              ref={emailInput}
              type="text"
              autoCapitalize="off"
              autoCorrect="off"
              size="25"
            />
            <FormHelperText className={classes.error}>
              {hasError && 'Please enter a valid email address'}
            </FormHelperText>
          </FormControl>
          <div /> {/* Empty div for centering form on mobile */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onSubmit(emailInput.current.value, form.current)} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

Subscribe.propTypes = {
  buttonClassName: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  contained: PropTypes.bool,
  fullScreen: PropTypes.bool,
  hasError: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  onSubscribe: PropTypes.func,
  showSubscribe: PropTypes.bool,
};

Subscribe.defaultProps = {
  buttonClassName: '',
  contained: false,
  fullScreen: false,
  hasError: false,
  onClose: () => {},
  onSubmit: () => {},
  onSubscribe: () => {},
  showSubscribe: false,
};

export default withMobileDialog({ breakpoint: 'xs' })(withStyles(styles)(Subscribe));
