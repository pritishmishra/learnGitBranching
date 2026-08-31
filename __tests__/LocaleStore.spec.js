var LocaleActions = require('../src/js/actions/LocaleActions');
var LocaleStore = require('../src/js/stores/LocaleStore');

describe('LocaleStore', function() {

  it('has default locale', function() {
    expect(LocaleStore.getLocale())
      .toEqual(LocaleStore.getDefaultLocale());
  });

  it('stays on English when locale changes are requested', function() {
    expect(LocaleStore.getLocale()).toEqual('en_US');
    LocaleActions.changeLocale('ja_JP');
    expect(LocaleStore.getLocale()).toEqual('en_US');
  });

  it('stays on English when browser language headers are provided', function() {
    LocaleActions.changeLocaleFromHeader('ja,en-US;q=0.9');
    expect(LocaleStore.getLocale()).toEqual('en_US');
  });

  it('only reports English as supported', function() {
    expect(LocaleStore.getSupportedLocales()).toEqual(['en_US']);
    expect(LocaleStore.getLangLocaleMap()).toEqual({ en: 'en_US' });
    expect(LocaleStore.getHeaderLocaleMap()).toEqual({});
  });
});
