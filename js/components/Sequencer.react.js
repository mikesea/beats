var React = require('react/addons');
var SequencerStore = require('../stores/SequencerStore');
var keymaster = require('keymaster');

var SequencerActions = require('../actions/SequencerActions');

var Sequencer = React.createClass({

  getInitialState: function() {
    return SequencerStore.getConfig();
  },

  componentDidMount: function() {
    SequencerStore.addChangeListener(this._onChange);
    keymaster('space', this._onToggle);
  },

  componentWillUnmount: function() {
    SequencerStore.removeChangeListener(this._onChange);
    keymaster.unbind('space', this._onToggle);
  },

  render: function() {
    return (
      <header className='sequencer controls'>
        <div className='container'>
          <div className='bpm control left'>
            <div>{this.state.bpm} bpm</div>

            <div className='actions'>
              <button onClick={this._onIncrementBPM}>+</button>
              <button onClick={this._onDecrementBPM}>-</button>
            </div>
          </div>

          <div className='play control right'>
            <button className='action' onClick={this._onPlay}>Play</button>
            <button className='action' onClick={this._onPause}>Pause</button>
          </div>

          <div className='headline'>
            <h1>SF-808</h1>
          </div>
        </div>
      </header>
    );
  },

  _onToggle: function(e) {
    SequencerActions.togglePlayState();
  },

  _onPlay: function() {
    SequencerActions.start();
  },

  _onPause: function() {
    SequencerActions.stop();
  },

  _onIncrementBPM: function() {
    var newBPM = this.state.bpm + 1;

    SequencerActions.setBPM(newBPM);
  },

  _onDecrementBPM: function() {
    var newBPM = this.state.bpm - 1;

    SequencerActions.setBPM(newBPM);
  },

  _onChange: function(config) {
    this.setState(config);
  }

});

module.exports = Sequencer;
