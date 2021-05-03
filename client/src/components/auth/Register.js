import React from 'react';
import { Fragment, useState } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap';

const Register = ({setAlert, register, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Passwords do not match. Please re-enter your password.');
        } else {
            register({ name, email, password });
        }
    };
    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }

    return (
      <Fragment>
        <div class="landing-inner">
        <div class="landing-box" style={{color:"#fff",width:"100%",animation:"popInAnimation ease 2s"}}>
        <h1 className="x-large">Register for <h1 class="x-large" style={{color:"#73ad5e",display:"inline"}}><i className="fas fa-leaf"></i>Greenhouse</h1></h1>
        <form className="form" onSubmit={ e=> onSubmit(e)}>
            <div className="form-group">
            <input type="text" placeholder="First Name" name="name" value={name} onChange={e => onChange(e)} required />
            </div>
            <div className="form-group">
            <input type="email" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required />
            </div>
            <div className="form-group">
            <input
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={password} onChange={e => onChange(e)} required
            />
            </div>
            <div className="form-group">
            <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                minLength="6"
                value={password2} onChange={e => onChange(e)} required
            />
            </div>
            <Button type="submit" className="btn">Register</Button>
            <h1 className="large" style={{ marginTop:"2rem" }}>Returning user?
            <Button className="btn" href="login" style={{ display:"inline-block"}}>Log In</Button></h1>
        </form>
        </div>
        </div>
      </Fragment>
    )
}

Register.propTypes ={
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}
const mapStatesToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStatesToProps, { setAlert, register })(Register);
