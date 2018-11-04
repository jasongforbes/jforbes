import { connect } from 'react-redux';
import MobileHeader from './mobileHeader';
import reducer from './reducers';

const mapStateToProps = state => ({
  ...state.mobileHeader,
});

const mapDispatchToProps = dispatch => ({
  onToggleMenu: () =>
    dispatch({
      type: 'TOGGLE_MENU',
    }),
});

export { reducer };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileHeader);
