var React = require('react/addons');
var Sequencer = require('../stores/SequencerStore');
var PulseStore = require('../stores/PulseListStore');
var TrackActions = require('../actions/TrackActions');

var Pulse = require('../components/Pulse.react');

var Track = React.createClass({

  getInitialState: function() {
    return {
      track: new Audio(this.props.url),
      pulseList: PulseStore.getAllForTrack(this.props.id)
    }
  },

  componentDidMount: function() {
    Sequencer.addPulseListener(this._onPulse);
    PulseStore.addChangeListener(this._onPulseChange);
  },

  componentWillUnmount: function() {
    Sequencer.removePulseListener(this._onPulse);
    PulseStore.removeChangeListener(this._onPulseChange);
  },

  render: function() {
    var trackId = this.props.id;
    var pulseListId = this.state.pulseList.id;
    var pulses = this.state.pulseList.pulses.map(function(pulse, index) {
      return <Pulse id={pulseListId}
                    index={index}
                    key={'pulse' + trackId + index} />
    });

    return (
      <li id={this.props.id} className={this.props.name + ' track clearfix'}>
        <div className='track-info'>
          <div className='track-header left'>
            <div className='track-name'>{this.props.name}</div>
          </div>

          <div className='track-header right'>
            <input
              className='volume'
              type='range'
              ref='volume'
              min='0.0'
              max='1.0'
              step='0.1'
              defaultValue={this.state.track.volume}
              onChange={this._onVolumeChange} />
            <span className='remove' onClick={this._onRemove}>&times;</span>
          </div>
        </div>

        <div className='pulses-wrapper'>
          <div className='track-pulses'>
            {pulses}
          </div>
        </div>
      </li>
    );
  },

  playTrack: function() {
    var track = this.state.track;

    // Make sure the track always starts over on each pulse
    track.pause();
    track.currentTime = 0;
    track.play();
  },

  _onPulse: function(payload) {
    if (this.state.pulseList.pulses[payload.pulse - 1] === 1) {
      this.playTrack();
    }
  },

  _onPulseChange: function() {
    this.setState({
      pulseList: PulseStore.getAllForTrack(this.props.id)
    })
  },

  _onVolumeChange: function() {
    var volume = this.refs.volume.getDOMNode().value;
    // Cheating a little bit here...
    this.state.track.volume = volume;
  },

  _onRemove: function() {
    TrackActions.removeTrack(this.props.id);
  }

});

module.exports = Track;
