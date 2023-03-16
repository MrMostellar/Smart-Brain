import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';
import ParticlesBg from 'particles-bg';
import FacialRecognition from './Components/Facial Recognition/FacialRecognition';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
class App extends React.Component{
    constructor(){
        super();
        this.state ={
            input: '',
            imageURL: '',
            box: {},
            route: 'SignIn',
            isSignedIn: false,
            user:{
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }
    }

// Loading Users

    loadUser = (data)=> {
        this.setState({
            user:{
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        });
    }

// Page Routing
    onRouteChange = (route)=> {
        this.setState({route: route});

        if(route === 'SignIn'){
            this.setState({isSignedIn: false});
        } else if(route === 'Home'){
            this.setState({isSignedIn: true});
        }
    }
// API Usage
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
                    if(result){
                        fetch('http://localhost:3000/image', {
                            method: 'put',
                            headers:{'Content-type': 'application/json'},
                            body: JSON.stringify({
                                id: this.state.user.id,
                            })
                        })
                        .then(response => response.json())
                        .then(count =>{
                            this.setState(Object.assign(this.state.user, {entries: count}));
                        })
                    }
                    const border = result.outputs[0].data.regions[0].region_info.bounding_box;
                    return this.displayFaceBox(this.calculateFaceLocation(border));
                })
                .catch(error => {
                    console.log(error);
                });
        }

// Event Handlers
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

//App Render
    render(){
        const {route, isSignedIn, imageURL, box} = this.state;
        const {name, entries} = this.state.user;
        return(
            <>
                <div className='max'>
                    <ParticlesBg type="lines" bg={true} />
                </div>
                <Navigation onRouteChange= {this.onRouteChange} isSignedIn={isSignedIn}/>
                {route === 'Home' 
                    ?
                    <>
                        <Rank name={name} entries={entries} />
                        <ImageLinkForm onInputChange={this.onInputChange} onClick={this.handleClick} onKeyDown = {this.handleKeyDown}/>
                        <FacialRecognition box={box} image={imageURL} />
                    </>
                    :(route === 'SignIn'
                        ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                        :<>
                            <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                        </>
                    )
                    
                }
            </>
        );
    }
}

export default App;