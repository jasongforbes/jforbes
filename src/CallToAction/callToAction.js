import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  button: {
    marginTop: '16px',
    marginBottom: '8px',
    height: '56px',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.2)',
  },
  error: {
    color: theme.palette.error.main,
  },
  input: {
    flexGrow: 1,
    borderWidth: 1,
  },
  inputWrapper: {
    display: 'flex',
  },
  border: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    '& fieldset': {
      borderWidth: '1px ! important',
    },
  },
});

class CallToAction extends React.Component {
  constructor(props) {
    super(props);
    this.emailInput = React.createRef();
    props.onMount();
  }

  render() {
    const { classes, emailAddress, hasError, loading, onChange, onSubmit } = this.props;
    return (
      <Grid container className={classes.page}>
        <Grid item xs={12}>
          <Typography variant="h4">Like this post and want to see more?</Typography>
          <Typography variant="subtitle1">
            Subscribe for exclusive content and never miss an update. No spam. Ever.
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.inputWrapper}>
          <TextField
            ref={this.emailInput}
            className={classes.input}
            label="Email Address"
            placeholder="Email Address"
            margin="normal"
            variant="outlined"
            error={hasError}
            disabled={loading}
            onChange={e => onChange(e.target.value)}
            value={emailAddress}
            InputProps={{
              classes: {
                focused: classes.border,
                notchedOutline: classes.border,
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.button}
            onClick={() => onSubmit(emailAddress)}
          >
            <Typography variant="button" color="secondary">
              Subscribe
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.inputWrapper}>
          <FormHelperText className={classes.error}>
            {hasError && 'Please enter a valid email address'}
          </FormHelperText>
        </Grid>
      </Grid>
    );
  }
}

CallToAction.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  emailAddress: PropTypes.string,
  hasError: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  onMount: PropTypes.func,
  onSubmit: PropTypes.func,
};

CallToAction.defaultProps = {
  emailAddress: '',
  hasError: false,
  loading: false,
  onChange: () => {},
  onMount: () => {},
  onSubmit: () => {},
};

export default withStyles(styles)(CallToAction);
