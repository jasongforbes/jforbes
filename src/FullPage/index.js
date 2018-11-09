import React from 'react';
import FullPage from './FullPage';

const withFullPage = (WrappedComponent, options = {}) => {
  const HOC = props => (
    <FullPage>
      <WrappedComponent {...props} />
    </FullPage>
  );
  return HOC;
};

export { withFullPage };

export default FullPage;
