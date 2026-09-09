var Sandbox = require('../src/js/sandbox').Sandbox;
var Visualization = require('../src/js/visuals/visualization').Visualization;

describe('reset solved command', function() {
  it('resets the current controller after clearing solved state', function() {
    var command = {
      get: function(key) {
        if (key === 'regexResults') {
          return { input: 'reset solved --confirm' };
        }
      },
      addWarning: function() {}
    };
    var deferred = {};
    var resetCommand = null;
    var resetDeferred = null;

    Sandbox.prototype.resetSolved.call({
      reset: function(commandArg, deferredArg) {
        resetCommand = commandArg;
        resetDeferred = deferredArg;
      }
    }, command, deferred);

    expect(resetCommand).toBe(command);
    expect(resetDeferred).toBe(deferred);
  });
});

describe('Visualization reset', function() {
  it('restores the initial local file state when resetting to the start tree', function() {
    var initialWorkingDirectoryChanges = {
      'settings.txt': { type: 'deleted' }
    };
    var initialStagedChanges = {
      'notes.txt': { type: 'added' }
    };
    var initialGitConfig = {
      'user.name': 'Student',
      'user.email': 'student@example.com'
    };
    var fake = {
      treeString: 'start-tree',
      options: {
        initialWorkingDirectoryChanges: initialWorkingDirectoryChanges,
        initialStagedChanges: initialStagedChanges,
        initialGitConfig: initialGitConfig
      },
      originVis: null,
      setTreeOpacity: function() {},
      fadeTreeIn: function() {},
      applyInitialLocalState: Visualization.prototype.applyInitialLocalState,
      gitEngine: {
        loadTreeFromString: jasmine.createSpy('loadTreeFromString'),
        defaultInit: jasmine.createSpy('defaultInit'),
        setLocalChangeState: jasmine.createSpy('setLocalChangeState'),
        setConfigState: jasmine.createSpy('setConfigState'),
        mockPullConflictConsumed: true,
        activeConflict: { filepath: 'shared.txt' }
      }
    };

    Visualization.prototype.reset.call(fake);

    expect(fake.gitEngine.loadTreeFromString).toHaveBeenCalledWith('start-tree');
    expect(fake.gitEngine.defaultInit).not.toHaveBeenCalled();
    expect(fake.gitEngine.setConfigState).toHaveBeenCalledWith(initialGitConfig);
    expect(fake.gitEngine.setLocalChangeState).toHaveBeenCalledWith(
      initialWorkingDirectoryChanges,
      initialStagedChanges
    );
    expect(fake.gitEngine.mockPullConflictConsumed).toBe(false);
    expect(fake.gitEngine.activeConflict).toBe(null);
  });

  it('clears local file state when the level has no initial file changes', function() {
    var fake = {
      treeString: 'start-tree',
      options: {},
      originVis: null,
      setTreeOpacity: function() {},
      fadeTreeIn: function() {},
      applyInitialLocalState: Visualization.prototype.applyInitialLocalState,
      gitEngine: {
        loadTreeFromString: jasmine.createSpy('loadTreeFromString'),
        defaultInit: jasmine.createSpy('defaultInit'),
        setLocalChangeState: jasmine.createSpy('setLocalChangeState'),
        setConfigState: jasmine.createSpy('setConfigState'),
        mockPullConflictConsumed: true,
        activeConflict: { filepath: 'shared.txt' }
      }
    };

    Visualization.prototype.reset.call(fake);

    expect(fake.gitEngine.setConfigState).not.toHaveBeenCalled();
    expect(fake.gitEngine.setLocalChangeState).toHaveBeenCalledWith(
      undefined,
      undefined
    );
    expect(fake.gitEngine.mockPullConflictConsumed).toBe(false);
    expect(fake.gitEngine.activeConflict).toBe(null);
  });

  it('does not overwrite local file state when resetting to an explicit undo tree', function() {
    var fake = {
      treeString: 'start-tree',
      options: {
        initialWorkingDirectoryChanges: {
          'settings.txt': { type: 'deleted' }
        }
      },
      originVis: null,
      setTreeOpacity: function() {},
      fadeTreeIn: function() {},
      applyInitialLocalState: Visualization.prototype.applyInitialLocalState,
      gitEngine: {
        loadTreeFromString: jasmine.createSpy('loadTreeFromString'),
        defaultInit: jasmine.createSpy('defaultInit'),
        setLocalChangeState: jasmine.createSpy('setLocalChangeState'),
        setConfigState: jasmine.createSpy('setConfigState'),
        mockPullConflictConsumed: true,
        activeConflict: { filepath: 'shared.txt' }
      }
    };

    Visualization.prototype.reset.call(fake, 'undo-tree');

    expect(fake.gitEngine.loadTreeFromString).toHaveBeenCalledWith('undo-tree');
    expect(fake.gitEngine.setConfigState).not.toHaveBeenCalled();
    expect(fake.gitEngine.setLocalChangeState).not.toHaveBeenCalled();
    expect(fake.gitEngine.mockPullConflictConsumed).toBe(true);
    expect(fake.gitEngine.activeConflict).toEqual({ filepath: 'shared.txt' });
  });
});
