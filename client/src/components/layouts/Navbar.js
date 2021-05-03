import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import {Dropdown} from 'react-bootstrap';


const Navbar = ({ auth: {isAuthenticated, loading}, logout }) => {
    const authLinks = (
      <Dropdown>
      <Dropdown.Toggle className="dropdown-basic"><i class="fas fa-bars" style={{color:"#000"}}></i></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item style={{margin:"0.25rem",color:"#fff",textTransform:"uppercase",fontFamily:"Roboto Mono"}} className="dropItem" href="/profiles" block>Profiles<br></br></Dropdown.Item>
          <Dropdown.Item style={{margin:"0.25rem",color:"#fff",textTransform:"uppercase",fontFamily:"Roboto Mono"}} className="dropItem"href="/posts" block>Forum</Dropdown.Item>
          <Dropdown.Item style={{margin:"0.25rem",color:"#fff",textTransform:"uppercase",fontFamily:"Roboto Mono"}} className="dropItem"href="/dashboard" block>Dashboard</Dropdown.Item>
          <Dropdown.Item style={{margin:"0.25rem",color:"#fff",textTransform:"uppercase",fontFamily:"Roboto Mono"}} className="dropItem"href="/chat" block>Chat</Dropdown.Item>
          <Dropdown.Item style={{margin:"0.25rem",color:"#fff",textTransform:"uppercase",fontFamily:"Roboto Mono"}} className="dropItem"href="/messages" block>Messages</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item style={{margin:"0.25rem",color:"#fff",textTransform:"uppercase",fontFamily:"Roboto Mono"}} className="dropItem" onClick={logout} href="#!">
            <span className="hide-sm">
            Log out
            </span></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    
    const guestLinks = (
      <Dropdown>
      <Dropdown.Toggle className="dropdown-basic"><i class="fas fa-bars" style={{color:"#000"}}></i></Dropdown.Toggle>
        <Dropdown.Menu >
          <Dropdown.Item style={{margin:"0.25rem",color:"#fff",textTransform:"uppercase",fontFamily:"Roboto Mono"}} className="dropItem" href="/profiles" block>Profiles</Dropdown.Item>
          <Dropdown.Item style={{margin:"0.25rem",color:"#fff",textTransform:"uppercase",fontFamily:"Roboto Mono"}} className="dropItem" href="/register" block>Register</Dropdown.Item>
          <Dropdown.Item style={{margin:"0.25rem",color:"#fff",textTransform:"uppercase",fontFamily:"Roboto Mono"}} className="dropItem" href="/login" block>Login</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    return (
        <nav class="navbar bg-dark">
            <h1>
                <Link to="/"><i class="fas fa-leaf"></i><Link to="/" style={{color: "#c9c9c9",fontFamily:"Merriweather"}}>greenhouse</Link></Link>
            </h1>
            { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    )
}

const mapSateToProps = state => ({
    auth: state.auth
})

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

export default connect(mapSateToProps, { logout })(Navbar)
