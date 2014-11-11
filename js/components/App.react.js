var React = require('react/addons');
var Sequencer = require('./Sequencer.react');
var Track = require('./Track.react');

var TrackStore = require('../stores/TrackStore');
var SoundStore = require('../stores/SoundStore');

var SequencerActions = require('../actions/SequencerActions');
var TrackActions = require('../actions/TrackActions');

var App = React.createClass({

  getInitialState: function() {
    return {
      tracks: TrackStore.getAll(),
      sounds: SoundStore.getAll()
    }
  },

  componentDidMount: function() {
    TrackStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TrackStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var tracks = this.state.tracks.map(function(track) {
      return <Track id={track.id}
                    name={track.name}
                    url={track.url}
                    key={track.id} />
    });

    var sounds = this.state.sounds.map(function(sound) {
      return <option value={sound.id} key={sound.id}>{sound.name}</option>;
    });

    return (
      <div id='drumMachine'>
        <Sequencer />

        <ul className='tracks'>
          {tracks}
          <li className='track choose'>
            <select ref='sound' onChange={this._onAddTrack}>
              <option>Add a track</option>
              {sounds}
            </select>
          </li>
        </ul>

        <footer>
          <ul>
            <li>Created by: <a href='https://twitter.com/mikec' target='_blank'>Mike</a></li>
            <li><a href='https://github.com/mikesea/sm-808' target='_blank'>Source</a></li>
          </ul>
        </footer>
      </div>
    );
  },

  _onAddTrack: function() {
    var soundId = this.refs.sound.getDOMNode().value;
    TrackActions.addTrack({ soundId: soundId });
    this.refs.sound.getDOMNode().value = 'Add a track'
  },

  _onChange: function() {
    this.setState({ tracks: TrackStore.getAll() })
  }

});

module.exports = App;
