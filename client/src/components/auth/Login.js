import React from 'react';
import { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Button } from 'react-bootstrap';
import { setAlert } from '../../actions/alert';

const Login = ({login, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
        if(!isAuthenticated) {
            setAlert('Login error');
        }
    }

    // Redirect if logged in
    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }

    return (
      <Fragment>
          <div class="landing-inner">
          <div class="landing-box" style={{color:"#fff",width:"100%",animation:"popInAnimation ease 2s"}}>
        <h1 className="x-large">Sign into <h1 class="x-large" style={{color:"#73ad5e",display:"inline"}}><i className="fas fa-leaf"></i>Greenhouse</h1></h1>
        <form className="form" onSubmit={ e=> onSubmit(e)}>
            <div className="form-group">
            <input type="email" 
            placeholder="Email" 
            name="email" 
            value={email} 
            onChange={e => onChange(e)} required />
            </div>
            <div className="form-group">
            <input type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={password} 
                onChange={e => onChange(e)} required />
            </div>
            <Button type="submit" className="btn">Log In</Button>

            <h1 className="large" style={{ marginTop:"2rem" }}>New user?
            <Button className="btn" href="register" style={{ display:"inline-block"}}>Register</Button></h1>
        </form>
        </div>
        </div>
      </Fragment>
    )
}

Login.protoTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStatesToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStatesToProps, {login})(Login);
