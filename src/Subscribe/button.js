import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const SubscribeButton = ({ buttonClassName, contained, onSubscribe }) => (
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
  </React.Fragment>
);

SubscribeButton.propTypes = {
  buttonClassName: PropTypes.string,
  contained: PropTypes.bool,
  onSubscribe: PropTypes.func,
};

SubscribeButton.defaultProps = {
  buttonClassName: '',
  contained: false,
  onSubscribe: () => {},
};

export default SubscribeButton;
