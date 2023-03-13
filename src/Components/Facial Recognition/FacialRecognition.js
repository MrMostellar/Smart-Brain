import React from 'react';
import './FacialRecognition.css';

const FacialRecognition = ({image, box}) =>{
    return(
        <div className='center ma'>
            <div className='relative mt2'>
            <img id='imageInput' width= '500 px' height='auto' src={image} alt=''/>
            <div className='imgBox' 
            style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
            >
            </div>
            </div>
        </div>
    );
}

export default FacialRecognition;