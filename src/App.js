import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';
import ParticlesBg from 'particles-bg';
import FacialRecognition from './Components/Facial Recognition/FacialRecognition';
import LogIn from './Components/LogIn/LogIn';
import SignUp from './Components/SignUp/SignUp';
class App extends React.Component{
    constructor(){
        super();
        this.state ={
            input: '',
            imageURL: '',
            box: {},
            route: 'LogIn'
        }
    }

    onRouteChange = (route)=> {
        this.setState({route: route});
    }
    
    calculateFaceLocation(data){
        const image = document.getElementById("imageInput");
        const width = Number(image.width);
        const height = Number(image.height);
        return{
            leftCol: data.left_col * width,
            topRow: data.top_row * height,
            rightCol: width - (data.right_col * width),
            bottomRow: height - (data.bottom_row * height)
        }
    }

    displayFaceBox(box){
        this.setState({box: box});
    }

    handleKeyDown = (event) => {
        if(event.keyCode === 13){
            this.handleClick();
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
            .then(response => response.json())
            .then(result => { 
                const border = result.outputs[0].data.regions[0].region_info.bounding_box;
                return this.displayFaceBox(this.calculateFaceLocation(border));
            })
            .catch(error => console.log('error', error));
    }

    render(){
        return(
            <>
                <div className='max'>
                    <ParticlesBg type="lines" bg={true} />
                </div>
                <Navigation onRouteChange= {this.onRouteChange}/>
                { this.state.route === 'Home' 
                    ?
                    <>
                        <Logo />
                        <Rank />
                        <ImageLinkForm onInputChange={this.onInputChange} onClick={this.handleClick} onKeyDown = {this.handleKeyDown}/>
                        <FacialRecognition box ={this.state.box} image={this.state.imageURL} />
                    </>
                    :(this.state.route === 'LogIn'
                        ?<LogIn onRouteChange={this.onRouteChange} />
                        :<>
                            <SignUp onRouteChange={this.onRouteChange} />
                        </>
                    )
                    
                }
            </>
        );
    }
}

export default App;