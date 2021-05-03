import React, {useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import avatar from '../../img/avatar.png';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
   useEffect(()=> {
       getCurrentProfile();
   }, []);

   
    return loading && profile === null ? <Spinner /> : <Fragment>
      <div class="landing-inner" style={{alignSelf:"center", width:"100%"}}>
      <div class="landing-box" style={{alignSelf:"center",color:"#fff",width:"100%",animation:"popInAnimation ease 2s"}}>
    <h1 className="x-large text-light">Dashboard <i className="fas fa-leaf text-primary" /></h1>

    {profile !== null ? (
      <Fragment>
            <p className="large" style={{ textAlign:"left"}}>
     <img className='round-img' style={{ backgroundColor:"#ffffff",width:"25px",display:"inline" }} src={avatar} alt='' /> Welcome back, {user && user.name}.
    </p>
        <DashboardActions />
        <div className="my-2">
          <button className="btn btn-danger" onClick={()=>deleteAccount()}>
            <i className="fas fa-minus-circle" /> Delete Account
          </button>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <h1 className="large text-primary" style={{margin:"none",fontWeight:"800",display:"inline"}}>Hold on, {user && user.name}.</h1>
        <p className="lead" style={{display:"inline"}}> You haven't configured your Greenhouse profile yet.</p><br />
        <Link to="/create-profile" className="btn btn-primary my-1" style={{display:"inline-block",paddingLeft:"3rem",paddingRight:"3rem"}}>
        Get Started <i className='fas fa-pen-fancy text-dark' /> 
        </Link>
      </Fragment>
    )}
    </div>
    </div>
  </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({

    auth: state.auth,
    profile: state.profile

})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard)
