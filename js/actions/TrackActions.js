var AppDispatcher = require('../dispatcher/AppDispatcher');

var TrackActions = {

  addTrack: function(data) {
    AppDispatcher.handleViewAction({
      actionType: 'addTrack',
      soundId: data.soundId
    });
  },

  removeTrack: function(id) {
    AppDispatcher.handleViewAction({
      actionType: 'removeTrack',
      id: id
    });
  }

};

module.exports = TrackActions;
