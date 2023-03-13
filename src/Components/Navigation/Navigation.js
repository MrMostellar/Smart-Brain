import React from "react";

// const instead of class because this component will not have state.
const Navigation = ({onRouteChange, isSignedIn}) =>{
    if(isSignedIn){
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={()=>onRouteChange('SignIn')} className="f4 link dim white underline pa3 pointer">Sign Out</p>
            </nav>
        );
    } else{
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={()=>onRouteChange('SignIn')} className="f4 link dim white underline pa3 pointer">Sign in</p>
                <p onClick={()=>onRouteChange('SignUp')} className="f4 link dim white underline pa3 pointer">Sign up</p>
            </nav>
        );
    }
}
export default Navigation;