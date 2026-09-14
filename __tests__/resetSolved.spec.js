var Sandbox = require('../src/js/sandbox').Sandbox;
var Visualization = require('../src/js/visuals/visualization').Visualization;
var HeadlessGit = require('../src/js/git/headless').HeadlessGit;

describe('reset solved command', function() {
  function runResetCommand(input) {
    var command = {
      error: null,
      warnings: [],
      get: function(key) {
        if (key === 'regexResults') {
          return { input: input };
        }
      },
      set: function(key, value) {
        this[key] = value;
      },
      addWarning: function(warning) {
        this.warnings.push(warning);
      },
      finishWith: function(deferredArg) {
        this.finishedWith = deferredArg;
      }
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

    return {
      command: command,
      deferred: deferred,
      resetCommand: resetCommand,
      resetDeferred: resetDeferred
    };
  }

  it('resets the current controller after clearing all solved state', function() {
    var result = runResetCommand('reset solved --confirm');

    expect(result.resetCommand).toBe(result.command);
    expect(result.resetDeferred).toBe(result.deferred);
  });

  it('resets the current controller after clearing solved lessons', function() {
    var result = runResetCommand('reset lessons --confirm');

    expect(result.resetCommand).toBe(result.command);
    expect(result.resetDeferred).toBe(result.deferred);
  });

  it('resets the current controller after clearing solved exercises', function() {
    var result = runResetCommand('reset exercises --confirm');

    expect(result.resetCommand).toBe(result.command);
    expect(result.resetDeferred).toBe(result.deferred);
  });

  it('requires confirmation before resetting lessons', function() {
    var result = runResetCommand('reset lessons');

    expect(result.resetCommand).toBe(null);
    expect(result.command.error.get('msg')).toBe(
      'Reset solved will mark each lesson as not yet solved; because ' +
      'this is a destructive command, please pass in --confirm to execute'
    );
    expect(result.command.finishedWith).toBe(result.deferred);
  });

  it('requires confirmation before resetting exercises', function() {
    var result = runResetCommand('reset exercises');

    expect(result.resetCommand).toBe(null);
    expect(result.command.error.get('msg')).toBe(
      'Reset solved will mark each exercise as not yet solved; because ' +
      'this is a destructive command, please pass in --confirm to execute'
    );
    expect(result.command.finishedWith).toBe(result.deferred);
  });
});

describe('Visualization reset', function() {
  it('fills missing Git config defaults without overwriting existing values', function() {
    var headless = new HeadlessGit();
    headless.gitEngine.setConfigState({
      'user.name': 'Existing Student'
    });

    headless.gitEngine.applyDefaultConfigState({
      'user.name': 'Default Student',
      'user.email': 'student@example.com'
    });

    expect(headless.gitEngine.gitConfig).toEqual({
      'user.name': 'Existing Student',
      'user.email': 'student@example.com'
    });
  });

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
        applyDefaultConfigState: jasmine.createSpy('applyDefaultConfigState'),
        mockPullConflictConsumed: true,
        activeConflict: { filepath: 'shared.txt' }
      }
    };

    Visualization.prototype.reset.call(fake);

    expect(fake.gitEngine.loadTreeFromString).toHaveBeenCalledWith('start-tree');
    expect(fake.gitEngine.defaultInit).not.toHaveBeenCalled();
    expect(fake.gitEngine.applyDefaultConfigState).toHaveBeenCalledWith(initialGitConfig);
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
        applyDefaultConfigState: jasmine.createSpy('applyDefaultConfigState'),
        mockPullConflictConsumed: true,
        activeConflict: { filepath: 'shared.txt' }
      }
    };

    Visualization.prototype.reset.call(fake);

    expect(fake.gitEngine.applyDefaultConfigState).not.toHaveBeenCalled();
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
        applyDefaultConfigState: jasmine.createSpy('applyDefaultConfigState'),
        mockPullConflictConsumed: true,
        activeConflict: { filepath: 'shared.txt' }
      }
    };

    Visualization.prototype.reset.call(fake, 'undo-tree');

    expect(fake.gitEngine.loadTreeFromString).toHaveBeenCalledWith('undo-tree');
    expect(fake.gitEngine.applyDefaultConfigState).not.toHaveBeenCalled();
    expect(fake.gitEngine.setLocalChangeState).not.toHaveBeenCalled();
    expect(fake.gitEngine.mockPullConflictConsumed).toBe(true);
    expect(fake.gitEngine.activeConflict).toEqual({ filepath: 'shared.txt' });
  });
});
