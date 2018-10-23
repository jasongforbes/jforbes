import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node,
};

ScrollToTop.defaultProps = {
  children: (<div />),
};

export default ScrollToTop;
