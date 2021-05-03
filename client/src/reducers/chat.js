import React from 'react'
import PropTypes from 'prop-types'
import {GET_CHAT,POST_CHAT} from '../actions/types'

const initialState = {
    chats: [],
    loading: true,
    chat: null
}

export default function(state= initialState, action){

    const { type, payload } = action;

    switch(type){
    case GET_CHAT:
            return {
                ...state,
                chats:payload,
                loading: false
            }
    case POST_CHAT:
        return {
            ...state,
            chats: [payload, ...state.chats],
            loading: false
        };
    default:
        return state;
    }

}
