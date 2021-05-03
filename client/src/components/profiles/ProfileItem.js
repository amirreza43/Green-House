import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const ProfileItem = ({profile: {
    user: { _id, name},
    lastName,
    location,
    dob,
    contact,
    aboutMe
}}) => {
    return (
        <div className="profile bg-light">
            <img src="" alt="" className="round-img"/>
            <div>
                <h2>{name} {lastName}</h2>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <p className="my-1">{dob && <span>{dob}</span>}</p>
                <p className="my-1">{contact && <span>{contact}</span>}</p>
                <p className="my-1">{aboutMe && <span>{aboutMe}</span>}</p>
                <Link to={`/profile/${_id}`} className='btn btn-primary'>View Profile</Link>
            </div>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
