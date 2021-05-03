import React from 'react'
import PropTypes from 'prop-types'
import {GET_MESSAGES} from './types'
import { setAlert } from './alert'
import axios from 'axios'


//Get all messages
export const getDMs = () => async dispatch => {
    try {
        const res = await axios.get('/api/post/message');
        console.log(res);
        dispatch({
            type: GET_MESSAGES,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

