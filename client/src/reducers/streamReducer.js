import _ from 'lodash';
import {
  FETCH_STREAM,
  CREATE_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_VIDEO
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
    case CREATE_STREAM:
    case EDIT_STREAM:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case FETCH_VIDEO:
      return {
        ...state,
        video: action.payload
      };
    case DELETE_STREAM:
      return _.omit(state, action.payload);

    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };

    default:
      return state;
  }
};
