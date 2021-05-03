import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost, addLike, removeLike } from '../../actions/post';
import avatar from '../../img/avatar.png';
import ReactHtmlParser from 'react-html-parser'; 


const PostItem = ({addLike, removeLike, auth, post: {_id, text, title, name, date, user, likes, fileName, filePath }, deletePost}) =>(
          
  
        <div class="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </a>
          </div>
          <div>
            <p class="my-1">
            <div> { ReactHtmlParser (text) } </div>
            </p>
            <p>{filePath ? <img style={{width:"100%", height:"auto"}} src={filePath} target="_blank"/> : null}
              
            </p>
             <p class="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p> 
            <div style={{margin:"1rem",alignSelf:"right"}}>
          <button
            onClick={() => addLike(_id)}
            type='button'
            className='btn btn-light'
            >
            <i className='fas fa-thumbs-up' />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type='button'
            className='btn btn-light btn-sm'>
            Unlike
          </button>
            <Link to={`/post/${_id}`} class="btn btn-primary" style={{display:"inline"}}>
            <i class="fas fa-link"></i> Permalink 
            </Link>
            { !auth.loading && user === auth.user._id && (
                <Link      
                    style={{display:"inline"}}
                    type="button"
                    class="btn btn-danger"
                    onClick={e=> deletePost(_id)}>
                    <i class="fas fa-times" />
                </Link> 
            )}</div>
            
          </div>
        </div>
)
PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem)
