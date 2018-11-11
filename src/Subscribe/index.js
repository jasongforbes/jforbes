import { connect } from 'react-redux';
import Subscribe from './subscribe';
import reducer from './reducer';

const mapStateToProps = state => ({
  ...state.subscribe,
});

const mapDispatchToProps = dispatch => ({
  onClose: () =>
    dispatch({
      type: 'CLOSE_SUBSCRIBE',
    }),
  onSubscribe: () =>
    dispatch({
      type: 'OPEN_SUBSCRIBE',
    }),
});

export { reducer };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscribe);
