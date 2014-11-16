var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('eventemitter2');
var SoundStore = require('./SoundStore');
var randKey = require('../utils/StringUtils').randKey;
var assign = require('object-assign');
var _ = require('lodash');

var _tracks = [
  { id: 't_1', name: 'Kick', url: 'audio/kick.mp3' },
  { id: 't_2', name: 'Hi Hat', url: 'audio/hh.mp3' },
  { id: 't_3', name: 'Shaker', url: 'audio/shaker.mp3' },
  { id: 't_4', name: 'Snare 2', url: 'audio/snare2.mp3' },
]

function addTrack(soundId) {
  var song = SoundStore.get(soundId);
  _tracks.push({ id: randKey('t'), name: song.name, url: song.url })
}

function removeTrack(id) {
  _tracks = _.without(_tracks, _.findWhere(_tracks, {id: id}));
}

var TrackStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },

  getAll: function() {
    return _tracks;
  }

});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case 'addTrack':
      addTrack(action.soundId);
      TrackStore.emitChange();

    case 'removeTrack':
      removeTrack(action.id);
      TrackStore.emitChange();

    default:
      return true;
  }
});


TrackStore.setMaxListeners(0);

module.exports = TrackStore;
