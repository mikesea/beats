var AppDispatcher = require('../dispatcher/AppDispatcher');

var PulseActions = {

  toggleActive: function(pulseListId, index) {
    AppDispatcher.handleViewAction({
      actionType: 'toggleActive',
      id: pulseListId,
      index: index
    });
  }

};

module.exports = PulseActions;
