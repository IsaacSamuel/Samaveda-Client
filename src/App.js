import React from 'react';
import './static/css/App.css';
import Playback from './Playback';
import View from './View'



class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      paused: true,
      URI: null, //The unique identifier for the current song
      duration: null, //The duration of the current song
      position: null, //The position we're at in the playback of the current songs
      record_start_time: null, //The timestamp of where a recording begins
      record_end_time: null //The timestamp of where a recording ends
    }

    this.timer = null; //The pointer to the timer interval
    this.updateTime = this.updateTime.bind(this);
    this.handle_record = this.handle_record.bind(this);

  }

  updateTime() {
    let round = 0;

    if (!this.state["paused"] && this.state["position"] != null) {
      if (round % 7 != 0) {
        round += 1;
        this.setState({position: (this.state["position"] + 500)});
      }
      else { //every seventh round, query the state so that it never goes too far out of sync
        window.player.getCurrentState().then( retval => {
          this.setState({position: retval["position"]});
        });
        round = 0;
      }
    }
  }

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {

      //Need to eventually generate these tokens using backend API
      const token = process.env.REACT_APP_SPOTIFY_SECRET_KEY; //Defined in root folder in the config file, .env.local
      var player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); }
      });

      window.player = player;

      

      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });



      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
      player.connect()

      player.addListener('player_state_changed', player_state => { 

        if (this.timer != null) {
          clearInterval(this.timer);
        }

        this.setState({paused: player_state["paused"], duration: player_state["duration"], position: player_state["position"], URI: player_state["track_window"]["current_track"]["uri"] }) ;

        this.timer = setInterval(this.updateTime, 500);

        });
    }
  }

  handle_record(record_begin_time, record_stop_time) {
    this.setState({record_start_time : record_begin_time, record_end_time: record_stop_time}  )
    console.log("Recording began at: " + record_begin_time + " and ended at: " + record_stop_time)
  }


  render() {

      return (
        <div>
          <script src = "https://sdk.scdn.co/spotify-player.js"></script>
          <div id="view_container">
            <h1>Spotify Web Playback SDK Test Thingy</h1>

            <View 

             <div id = "playback_container">
                < Playback
                  duration = {this.state["duration"]}
                  position = {this.state["position"]}
                  paused = {this.state["paused"]}
                  recording_time = {this.handle_record} 
                />
              </div>
          </div>
      </div>
      );
  }
}





export default App;
