import React from 'react';
import './FacialRecognition.css';

const FacialRecognition = ({image, box}) =>{
    return(
        <div className='center ma'>
            <div className='relative mt2'>
            <img id='imageInput' width= '500 px' height='auto' src={image} alt=''/>
            {box.map((face) => {
                return <div className='imgBox' 
                style={{top: face.topRow, right: face.rightCol, bottom: face.bottomRow, left: face.leftCol}}
            >
            </div>
            })}

            </div>
        </div>
    );
}

export default FacialRecognition;