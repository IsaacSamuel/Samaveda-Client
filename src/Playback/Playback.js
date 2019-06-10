import React from 'react';
import '../static/css/Playback.css';
import ProgressBar from './Progress'



class Playback extends React.Component {
  constructor(props) {
    super(props)

    this.state = {recording: false, record_start : null};

    this.record = this.record.bind(this);

    this.record_pos = 0;
  }


  toggle() {
    if (window.player != null) { //if the web playback is not unintialized
      window.player.togglePlay();
    }
  }

  nextTrack() {
    if (window.player != null) { //if the web playback is not unintialized
      window.player.nextTrack();
    }
  }

  prevTrack() {
    if (window.player != null) { //if the web playback is not unintialized
      window.player.previousTrack();
    }
  }

  record() {
    this.record_pos = this.props.position;

    if (this.state.recording === false) {
      this.setState({
            recording: true,
            record_start : this.millisToMinutesAndSeconds(this.record_pos), 
          });
    }

    if (this.state.recording === true) {
      this.setState({
          recording: false,
        });

      let record_end = this.millisToMinutesAndSeconds(this.record_pos);

      //Pass this up so a comment box can be created
      this.props.recording_time(this.state.record_start, record_end);
    }
  }


  //Stolen from StackOverflow
  millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  render() {
    return (
        <div id = "playback_controls">
          <center>
            <label id="present_time">{this.millisToMinutesAndSeconds(this.props.position)}</label>

            <i id="previous" className="material-icons" onClick={() => this.prevTrack() }>fast_rewind</i>

            <i id="toggle" className="material-icons" onClick={() => this.toggle() }>{this.props.paused ? "play_circle_filled" : "pause_circle_filled"}</i>

            <i id="record" className="material-icons" onClick={() => this.record()}>fiber_manual_record</i>

            <i id="next" className="material-icons" onClick={() => this.nextTrack() }>fast_forward</i>

            <label id="track_duration">{this.millisToMinutesAndSeconds(this.props.duration)}</label>
          </center>

          < ProgressBar
            duration = {this.props.duration}
            position = {this.props.position}
            recording = {this.state.recording}
            record_pos = {this.record_pos}
          />

      </div>
    );
  }
}


export default Playback;