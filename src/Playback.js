import React from 'react';


class Playback extends React.Component {
  constructor(props) {
    super(props)

    this.state = {recording: false};

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
    this.setState(prevState => ({recording: !prevState.recording}));
    this.record_pos = this.props.position;
  }


  //Stolen from StackOverflow
  millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  render() {
    return (
      <div id="playback_controls">
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

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.bar_style = this.bar_style.bind(this);
    this.left = 0;
    this.end_pos = this.end_pos.bind(this);

  }

  componentDidMount() { 
      this._ismounted = true;
  }


  bar_style() {
    return {
      width: ((this.props.position / this.props.duration) * 100) + "%"
    }
  }

  end_pos() {
    if (this._ismounted) {
      return {
        left: (document.getElementById("progress").offsetWidth - 3) + "px"
      }
    }
    else {
      return { left : 0}
    }
  }

  render() {
    return (
      <div id="progress_bar">
          <div id="progress"
          style = {this.bar_style()}
          >
            < ProgressCircle 
              style = {this.end_pos()}
            />
          </div>
          < Record 
            position = {this.props.position}
            duration = {this.props.duration}
            recording = {this.props.recording}
            begin_pos = {this.props.record_pos}
          />
      </div>
    )
  }
}

class ProgressCircle extends React.Component {
  render() {
    return (
      <div id="progress_circle" style = {this.props.style}>
      </div>
    )
  }
}

class Record extends React.Component {
  constructor(props) {
    super(props)

    this.record_indicator_style = this.record_indicator_style.bind(this);
    this.block_style = this.block_style.bind(this);

  }

  componentDidMount() { 
      this._ismounted = true;
  }

  recording_duration



  record_indicator_style() {
    var retval = {
      left: ((this.props.begin_pos / this.props.duration) * 100) + "%"
    }


    if (this._ismounted) {
      if (document.getElementById("blocky").offsetLeft != 0) {
        retval["width"] = (document.getElementById("progress").offsetWidth - document.getElementById("blocky").offsetLeft) + "px"
      }
      else {
        retval["width"] = 0;
      }
    }

    retval["display"] = this.props.recording ? "block" : "none";

    return retval
  }

  block_style() {
    var retval = {
      left: ((this.props.begin_pos / this.props.duration) * 100) + "%"
    }

    retval["display"] = this.props.recording ? "block" : "none"
    //console.log(retval)
    return retval;
  }

  render() {
    return (
      <div id="record">
        <div id="record_indicator" style={this.record_indicator_style()}></div><div id="blocky" style={this.block_style()}></div>
      </div>
    )
  }
}

export default Playback;