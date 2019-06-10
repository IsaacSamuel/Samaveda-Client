import React from 'react';
import Record from './Record'

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

export default ProgressBar;



class ProgressCircle extends React.Component {
  render() {
    return (
      <div id="progress_circle" style = {this.props.style}>
      </div>
    )
  }
}
