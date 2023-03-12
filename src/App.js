import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';
import ParticlesBg from 'particles-bg';
import FacialRecognition from './Components/Facial Recognition/FacialRecognition';
class App extends React.Component{
    constructor(){
        super();
        this.state ={
            input: '',
            imageURL: ''
        }
    }

    onInputChange = (event) => {
       this.setState({input: event.target.value});
    }

    handleClick = () => {
        this.setState({imageURL: this.state.input});
        this.imageSubmit();
    }

    imageSubmit = () => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '1be12b20d7574e88b1de317e782e7353';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'mostellar';       
    const APP_ID = 'SmartBrain';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = this.state.input;
        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                        }
                    }
                }
            ]
        });
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };
    
        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    render(){
        return(
            <>
                <ParticlesBg type="lines" bg={true} />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onClick={this.handleClick}/>
                <FacialRecognition image={this.state.imageURL} />
            </>
        );
    }
}

export default App;