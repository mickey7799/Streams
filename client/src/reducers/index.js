import { combineReducers } from 'redux';
import authReducer from './authRuducer';

export default combineReducers({
  auth: authReducer
});
