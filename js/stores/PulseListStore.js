var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var randKey = require('../utils/StringUtils').randKey;
var assign = require('object-assign');
var _ = require('lodash');

var _pulses = [
  { id: 'p_1', trackId: 't_1', pulses: [ 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1 ] },
  { id: 'p_2', trackId: 't_2', pulses: [ 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0 ] },
  { id: 'p_3', trackId: 't_3', pulses: [ 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0 ] },
  { id: 'p_4', trackId: 't_4', pulses: [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1 ] }
]

// creates a new pulse set for a track,
// with each pulse defaulted to inactive (0)
function createPulseList(trackId) {
  var pulses = new Array(16);
  for (var i = pulses.length-1; i >= 0; -- i) pulses[i] = 0;

  _pulses.push({ id: randKey('p'), trackId: trackId, pulses: pulses })
}

var PulseListStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },

  getAllForTrack: function(trackId) {
    var pulses = _.findWhere(_pulses, {trackId: trackId});

    if (pulses) {
      return pulses;
    } else {
      createPulseList(trackId);
      return this.getAllForTrack(trackId);
    }
  },

  get: function(id) {
    return _.findWhere(_pulses, { id: id });
  },

  getWithIndex: function(id, index) {
    var pulseList = _.findWhere(_pulses, { id: id })

    return {
      active: pulseList.pulses[index] ? true : false
    }
  }

});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case 'toggleActive':
      var pulseList = _.findWhere(_pulses, {id: action.id})
      var bit = pulseList.pulses[action.index]
      pulseList.pulses[action.index] = bit ? 0 : 1
      PulseListStore.emitChange();

    default:
      return true;
  }
});

PulseListStore.setMaxListeners(500);

module.exports = PulseListStore;
