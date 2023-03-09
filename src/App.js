import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';
import ParticlesBg from 'particles-bg'
// import FacialRecognition from './FacialRecognition';
class App extends React.Component{
    render(){
        return(
            <>
                <ParticlesBg type="lines" bg={true} />
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