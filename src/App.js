import React from 'react';
import './index.css';
import Playback from './Playback';



class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      paused: true,
      URI: null, //The unique identifier for the current song
      duration: null, //The duration of the current song
      position: null, //The position we're at in the playback of the current songs
    }

    this.timer = null; //The pointer to the timer interval
    this.updateTime = this.updateTime.bind(this);

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

      const token = "BQCU2mhcE_4VKt4nzDodvpct9t2nJ2SmPu_D0eGlrTFTLftHM7Vr20cBU8Yn6-Y8Dn_OP9rPSWtqMWRxwT_41Q5gbNvGhkkWeVLogCv0bc-VEW14IFapOihXSBo9-YMg2lfitTUUZvsZwzn7qB9Ud2WFTijM05b9G1yic3McBClYFGiO1qRoXk6c";
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


  render() {

      return (
        <div>
          <script src = "https://sdk.scdn.co/spotify-player.js"></script>
        <h1>Spotify Web Playback SDK Test Thingy</h1>
        < Playback
          duration = {this.state["duration"]}
          position = {this.state["position"]}
          paused = {this.state["paused"]}
        />
      </div>
      );
  }
}





export default App;
