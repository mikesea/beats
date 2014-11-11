var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var _sounds = [
  { id: 's_1', name: 'Kick', url: 'audio/kick.mp3' },
  { id: 's_2', name: 'Hi Hat', url: 'audio/hh.mp3' },
  { id: 's_3', name: 'Snare', url: 'audio/snare.mp3' },
  { id: 's_4', name: 'Snare 2', url: 'audio/snare2.mp3' },
  { id: 's_5', name: 'Shaker', url: 'audio/shaker.mp3' },
  { id: 's_6', name: 'Rim', url: 'audio/rim.mp3' },
  { id: 's_7', name: 'Kick 2', url: 'audio/kick2.mp3' },
  { id: 's_8', name: 'Hi Hat 2', url: 'audio/hh2.mp3' },
  { id: 's_9', name: 'Clang', url: 'audio/clang.mp3' },
]

var SoundStore = assign({}, EventEmitter.prototype, {

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
    return _sounds;
  },

  get: function(id) {
    return _.findWhere(_sounds, {id: id});
  }

});

SoundStore.setMaxListeners(100);

module.exports = SoundStore;
