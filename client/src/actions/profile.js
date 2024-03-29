import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    ACCOUNT_DELETED,
    CLEAR_PROFILE
} from './types';

//Get current profile
export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//Create or Update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated/Created': 'Profile Created/Updated'), 'success');

        if(!edit){
            history.push('/dashboard')
        }

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });

        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(err.msg, 'danger')))
        }
    }
}


// Delete account & profile
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        const res = await axios.delete('/api/profile');
  
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED });
  
        dispatch(setAlert('Your account has been permanently deleted.'));
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    }
};

//Get all profile

export const getProfiles = () => async dispatch =>{
    dispatch({ type: CLEAR_PROFILE })
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//Get profile by id

export const getProfileById = userId => async dispatch =>{
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}
