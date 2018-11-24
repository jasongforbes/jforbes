import { combineReducers } from 'redux';
import { reducer as cta } from './CallToAction';
import { reducer as mobileHeader } from './MobileHeader';
import { reducer as subscribe } from './Subscribe';

export default combineReducers({ cta, mobileHeader, subscribe });
