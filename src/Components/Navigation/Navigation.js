import React from "react";

// const instead of class because this component will not have state.
const Navigation = ({onRouteChange}) =>{
    return(
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={()=>onRouteChange('LogIn')} className="f4 link dim white underline pa3 pointer">Sign Out</p>
        </nav>
    );
}
export default Navigation;