import React from "react";
import Logo from "../Logo/Logo";

// const instead of class because this component will not have state.
const Navigation = ({onRouteChange, isSignedIn}) =>{
    if(isSignedIn){
        return(
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Logo />
                <nav>
                <p onClick={()=>onRouteChange('SignIn')} className="f4 link dim white underline ma3 mt2 pointer">Sign Out</p>
                </nav>
            </div>
        );
    } else{
        return(
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Logo />
                    <nav style={{display: 'flex'}}>
                        <p onClick={()=>onRouteChange('SignIn')} className="f4 link dim white underline ma3 mt2 pointer">Sign in</p>
                        <p onClick={()=>onRouteChange('SignUp')} className="f4 link dim white underline ma3 mt2 pointer">Sign up</p>
                    </nav>
            </div>
        );
    }
}
export default Navigation;