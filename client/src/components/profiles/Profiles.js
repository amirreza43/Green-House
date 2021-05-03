import React,{Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';


const Profiles = ({ getProfiles, profile: { profiles, loading}}) => {

    useEffect(()=>{
        getProfiles();
    }, [getProfiles])

    const [searchData,setSearchData] = useState({
        searchField:''
    });

    const [filteredList, setFilteredProfiles] = useState([]);

    const onChange = e => setSearchData({searchData,searchField:e.target.value});

    useEffect(()=>{
        setFilteredProfiles(
            profiles.filter((profile) =>
                profile.name.toLowerCase().includes(searchData.searchField.toLowerCase())
            )
        );
    }, [searchData,Profiles])        

    return <Fragment>
        { loading ? <Spinner /> : <Fragment>
            <div class="landing-inner" style={{alignSelf:"center", width:"100%"}}>
      <div class="landing-box" style={{alignSelf:"center",color:"#fff",width:"100%",animation:"popInAnimation ease 2s"}}>
            <h1 className="x-large text-light">Profiles <i className="fas fa-user-circle text-primary" /></h1>
            
            <form className="form">      
                <div className="form-group">
                    <input type="text" placeholder="Search user profiles..." onChange={e => onChange(e)} />
                    <small className="form-text" style={{textAlign:"left",color:"#9c9c9c"}}>Enter a name to begin filtering.</small>
                </div>
            </form>


            <div className="profiles">
                {profiles.length > 0 ? (
                    filteredList.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                ) : <h4>No users found.</h4>}
            </div>
            </div>
      </div>
            </Fragment>}
    </Fragment>
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
