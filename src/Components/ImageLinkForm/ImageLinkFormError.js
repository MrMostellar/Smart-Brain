import React from "react";

const ImageLinkFormError = ({error}) =>{
    return(
        <div>
            <p className="red center">{error}</p>
        </div>
    );
}

export default ImageLinkFormError;