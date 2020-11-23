import streams from '../apis/streams';
import history from '../history';
import youtube from '../apis/youtube';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_VIDEO
} from './types';

const KEY = 'AIzaSyCN6e98GjAfa_d4E4mISSn8uCP6g5b1DvE';

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push('/');
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);
  return dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/');
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};

export const fetchVideo = term => async dispatch => {
  const response = await youtube.get('/search', {
    params: {
      q: term,
      part: 'snippet',
      maxResults: 1,
      type: 'video',
      key: KEY
    }
  });
  console.log('$$response.data.items[0]', response.data.items[0]);

  dispatch({ type: FETCH_VIDEO, payload: response.data.items[0] });
};
