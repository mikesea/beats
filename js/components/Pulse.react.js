var React = require('react/addons');

var Sequencer = require('../stores/SequencerStore');
var PulseStore = require('../stores/PulseListStore');
var PulseActions = require('../actions/PulseActions');

var assign = require('object-assign');
var classSet = React.addons.classSet;

var Pulse = React.createClass({

  getInitialState: function() {
    return assign(
      { pulsing: false },
      PulseStore.getWithIndex(this.props.id, this.props.index)
    )
  },

  componentDidMount: function() {
    Sequencer.addPulseListener(this._onPulse);
    PulseStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Sequencer.removePulseListener(this._onPulse);
    PulseStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var classes = classSet({
      'pulse': true,
      'active': this.state.active,
      'pulsing': this.state.pulsing
    });

    return(
      <span className={classes} onClick={this._onToggle}></span>
    );
  },

  _onToggle: function() {
    PulseActions.toggleActive(this.props.id, this.props.index);
  },

  _onPulse: function(payload) {
    // Eagerly show the pulse
    if (this.props.index === payload.pulse - 1) {
      this.setState({pulsing: true});
    } else {
      this.setState({pulsing: false});
    }
  },

  _onChange: function(payload) {
    this.setState(
      PulseStore.getWithIndex(this.props.id, this.props.index)
    );
  }
});

module.exports = Pulse;
