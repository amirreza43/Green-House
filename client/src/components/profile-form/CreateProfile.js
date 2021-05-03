import React, { useState, Fragment} from 'react';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


const CreateProfile = ({ createProfile, history }) => {

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        dob: '',
        location: '',
        aboutMe: '',
        contact: '',
        youtube: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: ''
    });

    const [displaySocialInput, toggleSocialInputs] = useState(false)

    const { 
        name, 
        lastName, 
        dob, 
        location, 
        aboutMe, 
        contact, 
        youtube, 
        facebook,
        twitter,
        linkedin,
        instagram
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history)
    }

    return (
        <Fragment>
        <div class="landing-inner">
          <div class="landing-box" style={{color:"#fff",width:"100%",animation:"popInAnimation ease 2s"}}>
          <h1 className="x-large text-primary">Your Profile</h1>
            <p className="large">Tell us a little about yourself. <i className="fas fa-leaf text-primary"></i></p>
            <p className="form-text" style={{textAlign:"left",color:"#9c9c9c",margin:"0.1rem"}}>* denotes required field</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
            <div class="form-group">
                <input onChange={e=> onChange(e)} type="text" placeholder="First Name *" value={name} name="name" required />
                </div>
                <div className="form-group">
                <input onChange={e=> onChange(e)} type="text" placeholder="Last Name *" value={lastName} name="lastName" required />
                </div>
                <div className="form-group">
                <input onChange={e=> onChange(e)} type="text" placeholder="Location" value={location} name="location" />
                <small className="form-text" style={{textAlign:"left",color:"#9c9c9c"}}>City & state recommended. </small>
                </div>
                <div className="form-group">
                <input onChange={e=> onChange(e)} type="text" placeholder="Date of Birth" value={dob} name="dob" />
                <small className="form-text" style={{textAlign:"left",color:"#9c9c9c"}}>Format: MM/DD/YY</small>
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="Preferred contact platform"
                    name="contact"
                    value={contact}
                    onChange={e=> onChange(e)}
                />
                <small className="form-text" style={{textAlign:"left",color:"#9c9c9c"}}>eg. "Gmail: example@gmail.com"</small>
                </div>
                <div className="form-group">
                <input onChange={e=> onChange(e)} type="text" placeholder="Bio" value={aboutMe} name="aboutMe" />
                <small className="form-text" style={{textAlign:"left",color:"#9c9c9c"}}>Anything else you'd like to mention</small>
                </div>

                <div className="my-2">
                <button onClick={()=> toggleSocialInputs(!displaySocialInput)} type="button" className="btn btn-light">
                Social Network Links (Optional)
                </button>
                </div>

                { displaySocialInput && <Fragment>

                <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter" name="twitter" value={twitter} onChange={e=> onChange(e)} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook" name="facebook" value={facebook} onChange={e=> onChange(e)} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" placeholder="YouTube" name="youtube" value={youtube} onChange={e=> onChange(e)}/>
                </div>

                <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input type="text" placeholder="Linkedin" name="linkedin" value={linkedin} onChange={e=> onChange(e)} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input type="text" placeholder="Instagram" name="instagram" value={instagram} onChange={e=> onChange(e)} />
                </div>

                </Fragment> }

                <button type="submit" className="btn btn-primary my-1">Submit</button>
               
            </form> 
                <Link className="btn btn-light my-1" to="dashboard">Go Back</Link>
            </div>
            </div>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
};



export default connect(null, {createProfile})(withRouter(CreateProfile))
