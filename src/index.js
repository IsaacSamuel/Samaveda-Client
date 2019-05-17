import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const spotify_player_script = document.createElement("script");
const material_icons = document.createElement("link");
spotify_player_script.src = "https://sdk.scdn.co/spotify-player.js";
material_icons.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
material_icons.rel = "stylesheet"

document.body.appendChild(spotify_player_script);
document.body.appendChild(material_icons);


ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
