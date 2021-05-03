import React, {   useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { setAlert } from './alert'
import { GET_POSTS, POST_ERROR, DELETE_POST, ADD_POST, UPDATE_LIKES, GET_POST, ADD_COMMMENT, REMOVE_COMMENT, ADD_Message, GET_MESSAGES } from './types'

//Get all post
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/post');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//Delete post
export const deletePost = (id) => async dispatch => {
    try {
        console.log(id);
        const res = await axios.delete(`/api/post/${id}`);


        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post Removed', 'success'));

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
        
    }
}

//Add post
export const addPost = formData => async dispatch => {

    try {
        
        const config = {
            headers:{
                'Content-type': 'application/json'
            }
        }
        const res = await axios.post('/api/post', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        

        dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
        
    }
}

//Get all messages
export const getMessages = () => async dispatch => {
    try {
        const res = await axios.get('/api/post/message');
        console.log(res);
        dispatch({
            type: GET_MESSAGES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//Add Message
export const addMessage = formData => async dispatch => {

    console.log('addMessage', formData);
    const receiver = formData.userid
    const form = new FormData();
    form.append('text', formData.text)
    try {
       
        const config = {
            headers:{
                'Content-type': 'application/json'
            }
        }
        const res = await axios.post(`/api/post/message/${receiver}`, {'text':formData.text});

        dispatch({
            type: ADD_Message,
            payload: res.data
        });

        

        dispatch(setAlert('Message Sent', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
        
    }
}


// Add like
export const addLike = id => async dispatch => {
    try {
      const res = await axios.put(`/api/post/like/${id}`);
  
      dispatch({
        type: UPDATE_LIKES,
        payload: { id, likes: res.data }
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};
  
  // Remove like
  export const removeLike = id => async dispatch => {
    try {
      const res = await axios.put(`/api/post/unlike/${id}`);
  
      dispatch({
        type: UPDATE_LIKES,
        payload: { id, likes: res.data }
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/post/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

//Add Commment
export const addComment = (PostId, formData) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-type': 'application/json'
            }
        }

        const res = await axios.post(`/api/post/comment/${PostId}`, formData, config);

        dispatch({
            type: ADD_COMMMENT,
            payload: res.data
        });

        

        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
        
    }
}

//delete Commment
export const deleteComment = (PostId, commentId) => async dispatch => {
    try {

        const res = await axios.delete(`/api/post/comment/${PostId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
        
    }
}