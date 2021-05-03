import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layouts/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import avatar from '../../img/avatar.png';


const Posts = ({post: { posts, loading }}) => {

    // useEffect(()=>{
    //     getPosts();
    // }, [getPosts])
    
    return loading ? <Spinner /> : (<Fragment>
      <div class="landing-inner">
      <div class="landing-box" style={{color:"#fff",width:"100%",animation:"popInAnimation ease 2s"}}>
        <h1 className="x-large text-light">Forum <i className="fas fa-leaf text-primary" /></h1>
        <PostForm  />


        <div className="posts" style={{marginTop:"3rem"}}>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
        </div>
        </div>
      </Fragment>)
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps)(Posts)
