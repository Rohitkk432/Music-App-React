// /* global gapi */ 
import React from 'react';
import './googlelogin.css';
// import {Link} from 'react-router-dom';

class GoogleLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedIn: false,
        }
    }
    onSuccess() {
        this.setState({
            isSignedIn: true
        })
    }

    componentDidMount(){
        window.gapi.load('auth2',()=>{
            this.auth2=window.gapi.auth2.init({
                client_id: '132873793273-jga64pb0l5nd25g2kjsr8rqm10tpt9pe.apps.googleusercontent.com'
            });
            this.auth2.then(() => {
                this.setState({
                    isSignedIn: this.auth2.isSignedIn.get(),
                });
            });
            window.gapi.load('signin2',()=>{
                var opts ={
                    width: 200,
                    height: 50,
                    onSuccess: this.onSuccess.bind(this),
                }
                window.gapi.signin2.render('loginButton', opts);
            });
        })
    }
    render(){
        return(
            <>  
                <div className="login-side">
                    <div className="apptext">
                        <div className="app-name">Music Pro X</div>
                        <div className="makers-org">A DevSoc Project</div>
                    </div>
                    <div className="logintext">
                        <div className="bitsdisclaimer">
                            <div className="bits-disclaimer">Sign in using</div>
                            <div className="bits-disclaimer">BITS mail</div>
                        </div>
                        <div id="loginButton"></div>
                    </div>
                </div>
            </>
        )
    }
    
}

export default GoogleLogin ;