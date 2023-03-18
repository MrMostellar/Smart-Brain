import React from "react";

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            SignUpName: '',
            SignUpEmail: '',
            SignUpPassword: '',
            ConfirmPassword: '',
            FormError: ''
        }
    }

handleNameChange = (event) =>{
    this.setState({SignUpName: event.target.value});
}

handleEmailChange = (event) =>{
    this.setState({SignUpEmail: event.target.value});
}

handlePasswordChange = (event) =>{
    this.setState({SignUpPassword: event.target.value});
}

handleConfirmPasswordChange = (event) =>{
    this.setState({ConfirmPassword: event.target.value});
}

onSubmit = () =>{
    const {SignUpEmail, SignUpName, SignUpPassword, ConfirmPassword} = this.state;
        if(!SignUpEmail || !SignUpName || !SignUpPassword || !ConfirmPassword){
            this.setState({FormError: 'Cannot submit blank..'});
        } else if(SignUpPassword !== ConfirmPassword){
            this.setState({FormError: 'Passwords dont match..'});
        } else if(!this.state.SignUpEmail.includes('@')){
            this.setState({FormError: 'Invalid Email'});
        } else{
            this.setState({FormError: ''});
            fetch('https://smart-brain-api-bce7.onrender.com/signup', {
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    name: this.state.SignUpName,
                    email: this.state.SignUpEmail,
                    password: this.state.SignUpPassword
                })
            })
            .then(response => response.json())
            .then(user =>{
                if(user !== 'user exists'){
                    this.props.loadUser(user);
                    this.props.onRouteChange('Home');
                } else{
                    this.setState({FormError: 'User with that email already exists..'});
                }
            })
            .catch(err => {
                console.log(err);
            });
        }          
}

    render(){
        return(
            <>
                <article className="br3 ba dark-gray bg-white b--black-10 mv4 w-100 w-50-m w-25-l mw center">
                    <main className="pa4 black-80">
                        <div className="measure">
                              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                    <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black" 
                                    type="name" 
                                    name="name"  
                                    id="name"
                                    onChange={this.handleNameChange}
                                />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.handleEmailChange}
                                />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.handlePasswordChange}
                                />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                                    <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black" 
                                    type="password" 
                                    name="confirmPassword"  
                                    id="confirmPassword"
                                    onChange={this.handleConfirmPasswordChange}
                                />
                                </div>
                            </fieldset>
                            <div className="">
                                <input onClick={this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign up"/>
                            </div>
                            <div>
                                <p className="center red f5">{this.state.FormError}</p>
                            </div>
                        </div>
                    </main>
                </article>
            </>
        );
    }
} 

export default SignUp;