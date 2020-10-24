import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authRuducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer
});
