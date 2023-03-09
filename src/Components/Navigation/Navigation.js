import React from "react";

// const instead of class because this component will not have state.
const Navigation = () =>{
    return(
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p className="f4 link dim white underline pa3 pointer"> Sign Out</p>
        </nav>
    );
}
export default Navigation;