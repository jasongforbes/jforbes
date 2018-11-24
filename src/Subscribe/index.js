import { connect } from 'react-redux';
import Button from './button';
import Subscribe from './subscribe';
import Success from './success';
import reducer from './reducer';
import emailDispatcher from '../emailDispatcher';

const mapStateToProps = state => ({
  ...state.subscribe,
});

const mapDispatchToProps = dispatch => ({
  onClose: () =>
    dispatch({
      type: 'CLOSE_SUBSCRIBE',
    }),
  onSubmit: emailDispatcher(dispatch),
  onSubscribe: () =>
    dispatch({
      type: 'OPEN_SUBSCRIBE',
    }),
});

const SubscribeButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);

const SubscribeDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscribe);

const SuccessDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(Success);

export { reducer, SubscribeButton, SubscribeDialog, SuccessDialog };
