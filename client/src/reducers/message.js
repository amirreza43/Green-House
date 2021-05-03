import React from 'react'
import PropTypes from 'prop-types'
import {GET_MESSAGES} from '../actions/types'

const initialState = {
    messages: [],
    loading: true,
    message: null
}

export default function(state= initialState, action){

    const { type, payload } = action;

    switch(type){
    case GET_MESSAGES:
            return {
                ...state,
                messages:payload,
                loading: false
            }
    default:
        return state;
    }

}
