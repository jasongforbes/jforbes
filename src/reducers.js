import { combineReducers } from 'redux';
import cta from './CallToAction/reducer';
import mobileHeader from './MobileHeader/reducers';
import subscribe from './Subscribe/reducer';
import linearFitPost from './Posts/LinearFitDiscontinuities/reducer';
import standardizationPost from './Posts/Standardization/reducer';

export default combineReducers({
  cta,
  linearFitPost,
  mobileHeader,
  subscribe,
  standardizationPost,
});
