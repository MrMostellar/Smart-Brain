import React from 'react';

const FacialRecognition = ({image}) =>{
    return(
        <div className='center'>
            <img src={image} alt=''/>
        </div>
    );
}

export default FacialRecognition;