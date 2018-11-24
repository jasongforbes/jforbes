import React from 'react';
import CallToAction from './callToAction';

const withCTA = (WrappedComponent, options = {}) => {
  const HOC = props => (
    <CallToAction>
      <WrappedComponent {...props} />
    </CallToAction>
  );
  return HOC;
};

export { withCTA };

export default CallToAction;
