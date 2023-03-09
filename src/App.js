import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Logo/Logo';
import ImageLinkForm from './ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank';
import './App.css';
// import FacialRecognition from './FacialRecognition';
class App extends React.Component{
    render(){
        return(
            <>
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm />
                {/*<FacialRecognition /> */}
            </>
        );
    }
}

export default App;