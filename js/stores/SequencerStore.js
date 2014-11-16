var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('eventemitter2');
var assign = require('object-assign');

var Sequencer = assign({}, EventEmitter.prototype, {

  currentPulse: 1,
  perMeasure: 4,
  measures: 4,
  bpm: 120,
  playState: 'stopped',

  addPulseListener: function(callback) {
    this.on('pulse', callback);
  },

  removePulseListener: function(callback) {
    this.removeListener('pulse', callback);
  },

  emitPulse: function() {
    var pulse = this.currentPulse;
    this.emit('pulse', { pulse: pulse });
    this.currentPulse++;
    if (this.currentPulse > this.perMeasure * this.measures) {
      this.currentPulse = 1;
    }
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },

  emitChange: function() {
    this.emit('change', this.getConfig());
  },

  start: function() {
    this.emitPulse();
    var interval = (60000 / this.bpm) / this.measures;

    this._intervalId = setInterval(this.emitPulse.bind(this), interval);
  },

  stop: function() {
    clearInterval(this._intervalId);
  },

  getConfig: function() {
    return {
      bpm: this.bpm,
      measures: this.measures,
      perMeasure: this.perMeasure,
      pulses: this.measures * this.perMeasure
    }
  },

  set: function(key, value) {
    this[key] = value;

    if (this.playState === 'started') {
      clearInterval(this._intervalId);
      this.start();
    }
  }

});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case 'start':
      if (Sequencer.playState === 'stopped') {
        Sequencer.start();
        Sequencer.playState = 'started';
      }
      break;

    case 'stop':
      if (Sequencer.playState === 'started') {
        Sequencer.stop();
        Sequencer.playState = 'stopped';
      }
      break;

    case 'setBPM':
      Sequencer.set('bpm', action.bpm);
      Sequencer.emitChange();
      break;

    case 'togglePlayState':
      if (Sequencer.playState === 'started') {
        Sequencer.stop();
        Sequencer.playState = 'stopped';
      } else {
        Sequencer.start();
        Sequencer.playState = 'started';
      }
      Sequencer.emitChange();
      break;

    default:
      return true;
  }
});

Sequencer.setMaxListeners(0);

module.exports = Sequencer;
