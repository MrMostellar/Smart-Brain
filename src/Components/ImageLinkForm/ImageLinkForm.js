import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onClick, onKeyDown})=>{
    return(
        <div>
            <p className="f3 ma4 white tc">
                {"This brain will identify faces in pictures, give it a try!"}
            </p>
            <div className="center">
                <div className="pa4 br3 shadow-5 center form">
                    <input onChange={onInputChange} onKeyDown= {onKeyDown} className="f4 pa2 w-70 center" type="text" placeholder="Enter a URL"/>
                    <button onClick={onClick} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple br2 pointer" type="submit">Try</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;