import React from 'react';
import Navigation from './Components/Navigation/Navigation';

// import Logo from './Logo';
// import ImageLinkForm from './ImageLinkForm';
// import FacialRecognition from './FacialRecognition';
class App extends React.Component{
    render(){
        return(
            <>
                <Navigation />
                {/* <Logo />
                <ImageLinkForm />
                <FacialRecognition /> */}
            </>
        );
    }
}

export default App;