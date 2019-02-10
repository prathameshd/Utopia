import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component{
    render(){
        return(
                <div className="landing">
                    <div className="dark-overlay landing-inner text-light">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12 text-center">
                            <h2 className="display-3 mb-4" >Utopia
                            </h2>
                            <p className="lead"> Match music to your mood!</p>
                           
                            <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            );
    }
}

export default Landing;