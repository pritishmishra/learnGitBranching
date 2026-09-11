var getSandboxCommandNames = require('../src/js/sandbox/commands').getSandboxCommandNames;

describe('Command registry', function() {
  it('does not include undo in sandbox commands', function() {
    expect(getSandboxCommandNames()).not.toContain('undo');
  });
});
