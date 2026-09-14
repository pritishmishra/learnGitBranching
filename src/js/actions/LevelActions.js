"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ActionTypes = AppConstants.ActionTypes;

var LevelActions = {

  setLevelSolved: function(levelID, best) { 
    AppDispatcher.handleViewAction({
      type: ActionTypes.SET_LEVEL_SOLVED,
      levelID: levelID,
      best: best
    });
  },

  resetLevelsSolved: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RESET_LEVELS_SOLVED
    });
  },

  resetLevelsSolvedByTab: function(tab) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RESET_LEVELS_SOLVED_BY_TAB,
      tab: tab
    });
  },

  setIsSolvingLevel: function(isSolvingLevel) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SET_IS_SOLVING_LEVEL,
      isSolvingLevel: isSolvingLevel,
    });
  },

  setIsSolvingExercise: function(isSolvingExercise) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SET_IS_SOLVING_EXERCISE,
      isSolvingExercise: isSolvingExercise,
    });
  },

};

module.exports = LevelActions;
