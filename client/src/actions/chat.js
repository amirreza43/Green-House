import React from 'react'
import PropTypes from 'prop-types'
import {GET_CHAT, POST_CHAT, POST_ERROR} from './types'
import { setAlert } from './alert'
import axios from 'axios'


//Get chat
export const getChat = () => async dispatch => {
    try {
        const res = await axios.get('/api/post/chat/all');
        console.log(res);
        dispatch({
            type: GET_CHAT,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

//Add chat
export const addChat = formData => async dispatch => {

    console.log('addChat', formData);
    try {
       
        const config = {
            headers:{
                'Content-type': 'application/json'
            }
        }
        const res = await axios.post(`/api/post/chat`, formData, config);

        dispatch({
            type: POST_CHAT,
            payload: res.data
        });

        

        dispatch(setAlert('Chat Sent', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
        
    }
}

