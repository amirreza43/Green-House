import React from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const Landing = ({ isAuthenticated }) => {

    if(isAuthenticated){
        return <Redirect to='/dashboard' />
    }

    return (
        // <section class="landing">
            <div class="dark-overlay">
                <div class="landing-inner">
                <div class="landing-box" style={{animation:"popInAnimation ease 2s"}}>
                    <h1 class="x-large" style={{
                    opacity:"0",
                    animation:"fadeInAnimation ease 2s",
                    animationDelay:"1s", 
                    animationIterationCount:"1",
                    animationFillMode:"forwards"
                    }}>Welcome to <h1 class="x-large" style={{
                    color:"#73ad5e",
                    }}>Greenhouse.</h1></h1>
                    <p class="lead" style={{
                        textAlign:"justify",
                        opacity:"0",
                        animation:"fadeInAnimation ease 2s",
                        animationDelay:"2s", 
                        animationIterationCount:"1",
                        animationFillMode:"forwards"}}
                        >
                        <b>Discover</b> & connect with other environmental enthusiasts across the globe.
                    </p>
                    
                    <div className="form-group">
                        <div className="form">
                            <h1 class="large" style={{marginTop:"5rem",
                                                        opacity:"0",
                                                        animation:"fadeInAnimation ease 2s",
                                                        animationDelay:"3s", 
                                                        animationIterationCount:"1",
                                                        animationFillMode:"forwards"
                                                        }}>Interested? Join today.</h1>
                            <Button block href="/login" style={{
                    opacity:"0",
                    animation:"fadeInAnimation ease 2s",
                    animationDelay:"3s",
                    animationIterationCount:"1",
                    animationFillMode:"forwards"
                    }} block>
                            Login
                            </Button>
                            <Button block href="/register" class="btn-dark" style={{
                    opacity:"0",
                    animation:"fadeInAnimation ease 2s",
                    animationDelay:"3s",
                    animationIterationCount:"1",
                    animationFillMode:"forwards"
                    }} block>
                        Register
                        </Button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        // </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({

    isAuthenticated: state.auth.isAuthenticated

})


export default connect(mapStateToProps)(Landing)
