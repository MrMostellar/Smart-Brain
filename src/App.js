import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import ImageLinkFormError from './Components/ImageLinkForm/ImageLinkFormError'
import Rank from './Components/Rank/Rank';
import './App.css';
import ParticlesBg from 'particles-bg';
import FacialRecognition from './Components/Facial Recognition/FacialRecognition';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';

const initialState ={
    input: '',
    imageURL: '',
    box: {},
    route: 'SignIn',
    isSignedIn: false,
    InvalidURL:'',
    user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}
class App extends React.Component{
    constructor(){
        super();
        this.state = initialState;
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
            this.setState(initialState);
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
                fetch('https://smart-brain-api-bce7.onrender.com/imageUrl?ssl=true', {
                    method: 'post',
                    headers:{'Content-type': 'application/json'},
                    body: JSON.stringify({
                        input: this.state.input
                    })
                })
                .then(response => response.json())
                .then(result => { 
                    const data = Object.values(result.outputs[0].data).length;
                    if(data !== 0){
                        fetch('https://smart-brain-api-bce7.onrender.com/image?ssl=true', {
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
                        this.setState({
                            InvalidURL: ''
                        });
                    } else{
                        this.setState({
                            InvalidURL: 'Invalid entry'
                        });
                    }
                    this.displayFaceBox(this.calculateFaceLocation(result.outputs[0].data.regions[0].region_info.bounding_box));
                    
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
                        <ImageLinkFormError error={this.state.InvalidURL} />
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