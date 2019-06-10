import React from 'react';


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
      if (document.getElementById("blocky").offsetLeft !== 0) {
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

export default Record;