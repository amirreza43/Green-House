import React from 'react';
import PropTypes from 'prop-types';
import profile from '../../reducers/profile';
import avatar from '../../img/avatar.png';

const ProfileTop = ({
    profile: {
      name,
      lastName,
      location,
      dob,
      contact,
      aboutMe,
      social,
    }
  }) => {
    return (
      <div class="landing-inner" style={{alignSelf:"center", width:"100%"}}>
      <div class="landing-box" style={{alignSelf:"center",color:"#fff",width:"100%",animation:"popInAnimation ease 2s"}}>
      <div className='profile-top bg-primary p-2'>
        <img className='round-img my-1' style={{ backgroundColor:"#ffffff" }} src={avatar} alt='' />
        <h1 className='large' style={{ fontWeight:"800" }}>{name + ' ' + lastName}</h1>
        <h1 className='lead'>
             {contact && <span>{contact}</span>}</h1>
        </div>
        <div style={{ backgroundColor:"#333333",border:"1px red" }} >
        <p>{location && <span>{location}</span>}</p>
        <div className='icons m'>
          {dob && <span>{dob}</span>}
          <br></br>
          {aboutMe && <span>{aboutMe}</span>}
          {social && social.twitter && (
            <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-twitter fa-2x' style={{ margin:"1rem" }} />
            </a>
          )}
          {social && social.facebook && (
            <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-facebook fa-2x' />
            </a>
          )}
          {social && social.linkedin && (
            <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-linkedin fa-2x' style={{ margin:"1rem" }} />
            </a>
          )}
          {social && social.youtube && (
            <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-youtube fa-2x' style={{ margin:"1rem" }} />
            </a>
          )}
          {social && social.instagram && (
            <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-instagram fa-2x' style={{ margin:"1rem" }} />
            </a>
          )}
        </div>
      </div>
      </div>
      </div>
    );
  };
  

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileTop
