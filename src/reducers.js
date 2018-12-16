import { combineReducers } from 'redux';
import { reducer as cta } from './CallToAction';
import { reducer as mobileHeader } from './MobileHeader';
import { reducer as subscribe } from './Subscribe';
import { reducer as linearFitPost } from './Posts/LinearFitDiscontinuities';

export default combineReducers({ cta, linearFitPost, mobileHeader, subscribe });
