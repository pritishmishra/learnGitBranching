var HeadlessGit = require('../src/js/git/headless').HeadlessGit;
var TreeCompare = require('../src/js/graph/treeCompare.js');
var Errors = require('../src/js/util/errors');

var loadTree = function(json) {
  return JSON.parse(unescape(json));
};

var compareLevelTree = function(headless, levelBlob) {
  var actualTree = headless.gitEngine.printTree();
  return TreeCompare.dispatchFromLevel(levelBlob, actualTree);
};

var compareAnswer = function(headless, expectedJSON) {
  var expectedTree = loadTree(expectedJSON);
  var actualTree = headless.gitEngine.exportTree();

  return TreeCompare.compareTrees(expectedTree, actualTree);
};

var getHeadlessSummary = function(headless) {
  var tree = headless.gitEngine.exportTree();
  TreeCompare.reduceTreeFields([tree]);
  return tree;
};

var expectLevelAsync = function(headless, levelBlob) {
  var command = levelBlob.solutionCommand;
  if (command.indexOf('git rebase -i') !== -1) {
    // don't do interactive rebase levels
    return;
  }

  return headless.sendCommand(command).then(function() {
    expect(compareLevelTree(headless, levelBlob)).toBeTruthy(
      'Level "' + levelBlob['name']['en_US'] + '" should get solved'
    );
  });
};

var commandSucceeded = function(command) {
  var err = command.get('error');
  return !err || err instanceof Errors.CommandResult;
};

var trackRequiredCommands = function(levelBlob, commands) {
  var requiredPatterns = levelBlob.requiredCommandPatterns || [];
  var requiredAnyOrderPatterns = levelBlob.requiredAnyOrderCommandPatterns || [];
  var requiredCommandsIssued = {};
  var requiredAnyOrderCommandsIssued = {};

  commands.forEach(function(command) {
    if (!commandSucceeded(command)) {
      return;
    }

    var rawStr = command.get('rawStr');
    var nextPatternIndex = requiredPatterns.findIndex(function(pattern, index) {
      return !requiredCommandsIssued[index];
    });

    if (nextPatternIndex !== -1 &&
        new RegExp(requiredPatterns[nextPatternIndex]).test(rawStr)) {
      requiredCommandsIssued[nextPatternIndex] = true;
    }

    requiredAnyOrderPatterns.forEach(function(pattern, index) {
      if (requiredAnyOrderCommandsIssued[index]) {
        return;
      }

      if (new RegExp(pattern).test(rawStr)) {
        requiredAnyOrderCommandsIssued[index] = true;
      }
    });
  });

  return {
    ordered: requiredPatterns.every(function(pattern, index) {
      return !!requiredCommandsIssued[index];
    }),
    anyOrder: requiredAnyOrderPatterns.every(function(pattern, index) {
      return !!requiredAnyOrderCommandsIssued[index];
    })
  };
};

var changeMapsMatch = function(actual, expected) {
  actual = actual || {};
  expected = expected || {};

  var actualKeys = Object.keys(actual).sort();
  var expectedKeys = Object.keys(expected).sort();

  if (actualKeys.length !== expectedKeys.length) {
    return false;
  }

  return expectedKeys.every(function(filepath, index) {
    return actualKeys[index] === filepath &&
      (!expected[filepath].type ||
        (actual[filepath] && actual[filepath].type === expected[filepath].type));
  });
};

var hasExpectedFileChangeState = function(gitEngine, levelBlob) {
  if (levelBlob.expectedHeadFileChanges &&
      !changeMapsMatch(
        gitEngine.getCommitFromRef('HEAD').get('fileChanges') || {},
        levelBlob.expectedHeadFileChanges
      )) {
    return false;
  }

  if (levelBlob.expectedWorkingDirectoryChanges &&
      !changeMapsMatch(
        gitEngine.workingDirectoryChanges || {},
        levelBlob.expectedWorkingDirectoryChanges
      )) {
    return false;
  }

  if (levelBlob.expectedStagedChanges &&
      !changeMapsMatch(
        gitEngine.stagedChanges || {},
        levelBlob.expectedStagedChanges
      )) {
    return false;
  }

  return true;
};

var runLevelCommands = function(levelBlob, command) {
  var headless = new HeadlessGit();
  if (levelBlob.startTree) {
    headless.gitEngine.loadTreeFromString(levelBlob.startTree);
  }

  headless.gitEngine.requireStagedChanges = !!levelBlob.requireStagedChanges;
  if (levelBlob.initialWorkingDirectoryChanges || levelBlob.initialStagedChanges) {
    headless.gitEngine.setLocalChangeState(
      levelBlob.initialWorkingDirectoryChanges,
      levelBlob.initialStagedChanges
    );
  }

  var commandPromise = {};
  commandPromise.promise = new Promise(function(resolve) {
    commandPromise.resolve = resolve;
  });

  return headless.sendCommand(command, commandPromise)
    .then(function() {
      return commandPromise.promise;
    })
    .then(function(commands) {
      var requiredState = trackRequiredCommands(levelBlob, commands);
      var treeSolved = compareLevelTree(headless, levelBlob);
      var cleanEnough = !levelBlob.requireCleanWorkingTreeForCompletion ||
        !headless.gitEngine.hasLocalChanges();
      var userConfigOk = !levelBlob.requireUserConfig ||
        headless.gitEngine.hasUserConfig();
      var fileChangesOk = hasExpectedFileChangeState(headless.gitEngine, levelBlob);
      var issuedRequiredCommands = requiredState.ordered && requiredState.anyOrder;

      return {
        solved: treeSolved && cleanEnough && userConfigOk &&
          fileChangesOk && issuedRequiredCommands,
        treeSolved: treeSolved,
        cleanEnough: cleanEnough,
        userConfigOk: userConfigOk,
        fileChangesOk: fileChangesOk,
        issuedRequiredCommands: issuedRequiredCommands,
        commands: commands,
        headless: headless
      };
    });
};

var expectLevelCommandsToSolve = function(levelBlob, command) {
  return runLevelCommands(levelBlob, command).then(function(result) {
    expect(result.solved).toBeTruthy(
      'Expected "' + levelBlob.name.en_US + '" to be solved'
    );
  });
};

var expectLevelCommandsNotToSolve = function(levelBlob, command) {
  return runLevelCommands(levelBlob, command).then(function(result) {
    expect(result.solved).toBeFalsy(
      'Expected "' + levelBlob.name.en_US + '" to remain unsolved'
    );
  });
};

var expectTreeAsync = function(command, expectedJSON, startJSON) {
  var headless = new HeadlessGit();

  if (startJSON) {
    headless.gitEngine.loadTreeFromString(startJSON);
  }

  return headless.sendCommand(command).then(function() {
    expect(compareAnswer(headless, expectedJSON)).toBeTruthy();
  });
};

var expectLevelSolved = function(levelBlob) {
  var headless = new HeadlessGit();
  if (levelBlob.startTree) {
    headless.gitEngine.loadTreeFromString(levelBlob.startTree);
  }
  expectLevelAsync(headless, levelBlob);
};

var runCommand = function(command, resultHandler) {
  var headless = new HeadlessGit();
  var msg = null;

  return new Promise(function(resolve) {
    headless.sendCommand(command, { resolve: resolve });
  }).then(function(commands) {
    if (commands && commands.length) {
      msg = commands[commands.length - 1].get('error').get('msg');
    }
    resultHandler(msg);
  });
};

var TIME = 150;
// useful for throwing garbage and then expecting one commit
var ONE_COMMIT_TREE = '{"branches":{"main":{"target":"C2","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}';

module.exports = {
  loadTree: loadTree,
  compareAnswer: compareAnswer,
  runLevelCommands: runLevelCommands,
  expectLevelCommandsToSolve: expectLevelCommandsToSolve,
  expectLevelCommandsNotToSolve: expectLevelCommandsNotToSolve,
  TIME: TIME,
  expectTreeAsync: expectTreeAsync,
  expectLevelSolved: expectLevelSolved,
  ONE_COMMIT_TREE: ONE_COMMIT_TREE,
  runCommand: runCommand
};
