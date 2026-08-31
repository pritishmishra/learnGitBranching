"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var ActionTypes = AppConstants.ActionTypes;
var DEFAULT_LOCALE = 'en_US';

var _locale = DEFAULT_LOCALE;
var LocaleStore = Object.assign(
{},
EventEmitter.prototype,
AppConstants.StoreSubscribePrototype,
{

  getDefaultLocale: function() {
    return DEFAULT_LOCALE;
  },

  getLangLocaleMap: function() {
    return { en: DEFAULT_LOCALE };
  },

  getHeaderLocaleMap: function() {
    return {};
  },

  getLocale: function() {
    return _locale;
  },

  getSupportedLocales: function() {
    return [DEFAULT_LOCALE];
  },

  dispatchToken: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var shouldInform = false;
    var oldLocale = _locale;

    switch (action.type) {
      case ActionTypes.CHANGE_LOCALE:
        _locale = DEFAULT_LOCALE;
        shouldInform = oldLocale !== _locale;
        break;
      case ActionTypes.CHANGE_LOCALE_FROM_HEADER:
        _locale = DEFAULT_LOCALE;
        shouldInform = oldLocale !== _locale;
        break;
    }

    if (shouldInform) {
      LocaleStore.emit(AppConstants.CHANGE_EVENT);
    }
  })

});

module.exports = LocaleStore;
