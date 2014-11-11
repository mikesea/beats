var AppDispatcher = require('../dispatcher/AppDispatcher');

var SequencerActions = {

  setBPM: function(newBPM) {
    AppDispatcher.handleViewAction({
      actionType: 'setBPM',
      bpm: newBPM
    });
  },

  start: function() {
    AppDispatcher.handleViewAction({
      actionType: 'start'
    });
  },

  stop: function() {
    AppDispatcher.handleViewAction({
      actionType: 'stop'
    });
  },

  togglePlayState: function() {
    AppDispatcher.handleViewAction({
      actionType: 'togglePlayState'
    });
  }

};

module.exports = SequencerActions;
