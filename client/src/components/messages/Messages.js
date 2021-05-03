import React, { Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getDMs} from '../../actions/message'
import Spinner from '../layouts/Spinner';
import MessageItem from './MessageItem';

const Messages = ({getDMs, message:{messages, loading}}) => {
    console.log(messages,'this is the messages log');
    useEffect(()=>{
        getDMs();
    }, [getDMs])
    return (<Fragment>
        <div class="landing-inner">
        <div class="landing-box" style={{color:"#fff",width:"100%",animation:"popInAnimation ease 2s"}}>
          <h1 className="x-large text-light">Messages<i className="fas fa-leaf text-primary" /></h1>
          <div className="posts" style={{marginTop:"3rem"}}>
            {messages.map((m) => {
               console.log(m);
               return(
                    
              <MessageItem key={m._id} message={m} />
            )
            })}
          </div>
          </div>
          </div>
        </Fragment>)
}

Messages.propTypes = {
    getMessages: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    message: state.message
})

export default connect(mapStateToProps, {getDMs})(Messages)
