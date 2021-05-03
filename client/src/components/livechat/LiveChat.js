import React, { Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getChat, addChat} from '../../actions/chat'
import Spinner from '../layouts/Spinner';
import ChatItem from './ChatItem.js';


const LiveChat = ({addChat, getChat, chat:{chats, loading}}) => {
    const [text, setText] = useState('')
    console.log(chats,'this is the messages log');
    useEffect(()=>{
        getChat();
    }, [getChat])
    const onSubmit = e =>{
        e.preventDefault();
        addChat({'text':text});
        window.location.href=window.location.href;
    }
    return (<Fragment>
        <div class="landing-inner">
        <div class="landing-box" style={{color:"#fff",width:"100%",animation:"popInAnimation ease 2s"}}>
          <h1 className="x-large text-light">Live Chat<i className="fas fa-leaf text-primary" /></h1>
          <form
            className='form my-1'
            onSubmit={onSubmit} >
            <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Write something...'
            value={text}
            onChange={e => setText(e.target.value)}
            required
            />
            <button type='submit' className='btn my'>Submit Post</button>
        </form>
          <div className="posts" style={{marginTop:"3rem"}}>
            {chats.map((m) => {
               console.log(m);
               return(
                    
              <ChatItem key={m._id} chat={m} />
            )
            })}
          </div>
          </div>
          </div>
          
        </Fragment>
        
        )
}

LiveChat.propTypes = {
    chat: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    chat: state.chat
})


export default connect(mapStateToProps, {getChat, addChat})(LiveChat);
