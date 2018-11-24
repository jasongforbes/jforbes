import React from 'react';
import { connect } from 'react-redux';
import CallToAction from './callToAction';
import reducer from './reducer';
import emailDispatcher from '../emailDispatcher';

const mapStateToProps = state => ({
  ...state.cta,
});

const mapDispatchToProps = dispatch => ({
  onChange: emailAddress =>
    dispatch({
      type: 'CTA_EMAIL_CHANGE',
      emailAddress,
    }),
  onMount: () =>
    dispatch({
      type: 'INITIALIZE_CTA',
    }),
  onSubmit: emailDispatcher(dispatch),
});

const WrappedCallToAction = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallToAction);

const withCTA = (WrappedComponent, options = {}) => {
  const HOC = props => (
    <WrappedCallToAction>
      <WrappedComponent {...props} />
    </WrappedCallToAction>
  );
  return HOC;
};

export { reducer, withCTA };

export default WrappedCallToAction;
