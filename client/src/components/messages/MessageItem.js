import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import avatar from '../../img/avatar.png';
import ReactHtmlParser from 'react-html-parser'; 


const MessageItem = ({auth,message, message: {_id, text, date, user, name}}) =>{

    console.log(message,'!@#$12345');

return (
    <div class="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img
          class="round-img"
          src={avatar}
          alt=""
        />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p class="my-1">
      <div> { ReactHtmlParser (text) } </div>
      </p>        
       <p class="post-date">
          Posted on <Moment format='YYYY-MM-DD HH:mm'>{date}</Moment>
      </p> 
      <div style={{margin:"1rem",alignSelf:"right"}}>
     </div>
      
    </div>
  </div>
)
}

MessageItem.propTypes = {
    auth: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(MessageItem)
