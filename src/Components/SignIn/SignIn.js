import React from "react";

class SignIn extends React.Component{
    
    constructor(props){
        super(props);
        this.state ={
            SignInEmail: '',
            SignInPassword: '',
            LoginFailed: ''
        }
    }

    handleEmailChange = (event) =>{
        this.setState({SignInEmail: event.target.value});
    }

    handlePasswordChange = (event) =>{
        this.setState({SignInPassword: event.target.value});
    }

    onSubmit = () =>{
        const {SignInEmail, SignInPassword} = this.state;
        if(!SignInEmail || !SignInPassword){
            this.setState({LoginFailed: 'Please enter your email/password..'});
        } else{
            fetch('https://smart-brain-api-bce7.onrender.com/signin', {
                method: 'post',
                headers:{'Content-type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.SignInEmail,
                    password: this.state.SignInPassword
                })
            })
            .then(response => response.json())
            .then(user => {
                    if(user.id){
                        this.props.loadUser(user);
                        this.props.onRouteChange('Home');
                    } else{
                        this.setState({LoginFailed: 'Incorrect email/password combination'});
                    }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
    
    render(){
        const {onRouteChange} = this.props;
        return(
            <>
                <article className="br3 ba dark-gray bg-white b--black-10 mv4 w-100 w-50-m w-25-l mw center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.handleEmailChange}
                                />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange= {this.handlePasswordChange}
                                />
                                </div>
                            </fieldset>
                            <div className="">
                                <input 
                                onClick={this.onSubmit} 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"
                            />
                            </div>
                            <div className="center red f6">
                                <p className="flex-wrap">{this.state.LoginFailed}</p>
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={() =>onRouteChange('SignUp')} className="f6 link dim black db pointer">Sign up</p>
                            </div>
                        </div>
                    </main>
                </article>

            </>

        );
    }
}
export default SignIn;