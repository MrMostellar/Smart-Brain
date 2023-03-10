import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';
import ParticlesBg from 'particles-bg'
import Clarifai from 'clarifai'
// import FacialRecognition from './FacialRecognition';
class App extends React.Component{
    constructor(){
        super();
        this.state ={
            onInputChange: '',
            onClick: ''
        }
    }

    app = new Clarifai.App({
        apiKey: 'a2d08a22717e4cbd82e096018aeabe66'
       });

    onInputChange = (event) => {
        console.log(event.target.value);
    }

    handleClick = () => {
        console.log("click");
    }

    render(){
        return(
            <>
                <ParticlesBg type="lines" bg={true} />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onClick={this.handleClick}/>
                {/*<FacialRecognition /> */}
            </>
        );
    }
}

export default App;