import React,{Fragment, useEffect, useState}from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { getProfileById } from '../../actions/profile';
import { addMessage } from '../../actions/post';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';

const Profile = ({ getProfileById, match, profile: { profile, loading }, auth, addMessage }) => {
    const [text, setText] = useState('')
    const userid = match.params.id;
    const onSubmit = e =>{
        e.preventDefault();
        console.log(userid, text);
        addMessage({userid, 'text':text});
    }

    useEffect(()=>{
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id])
   
    return <Fragment>
        {profile === null || loading ? <Spinner /> : <Fragment>
            <Link to='/profiles' className='btn btn-light'>
                Back To Profiles
            </Link>
            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
            <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}
            <div className="profile-grid my-1">
                <ProfileTop profile={profile} />
            </div>
            </Fragment>}
            <div class="post-form">
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
            </div>
    </Fragment>
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
} 

const mapStateToProps = state =>({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getProfileById, addMessage})(Profile)
