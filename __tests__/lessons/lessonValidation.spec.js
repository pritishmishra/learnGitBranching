var base = require('../base');
var TreeCompare = require('../../src/js/graph/treeCompare.js');
var Visualization = require('../../src/js/visuals/visualization').Visualization;
var levels = require('../../src/levels/index');

var IDENTITY_SETUP = [
  'git config user.name Student',
  'git config user.email student@example.com'
].join(';');

var lessonSequenceKeys = Object.keys(levels.sequenceInfo).filter(function(sequenceKey) {
  return levels.sequenceInfo[sequenceKey].tab === 'lessons';
});

var solutionWithPrerequisites = function(levelBlob) {
  var solution = levelBlob.solutionCommand;

  if (levelBlob.name.en_US !== 'Set Up Your Git Identity' &&
      /git +commit/.test(solution)) {
    return IDENTITY_SETUP + ';' + solution;
  }

  return solution;
};

var withIdentity = function(command) {
  return IDENTITY_SETUP + ';' + command;
};

var commandWithAlternateCommitMessages = function(command) {
  var commitIndex = 0;
  return command.replace(/git +commit +-m +(['"])[^'"]*\1/g, function(match, quote) {
    commitIndex++;
    return 'git commit -m ' + quote + 'Alternate lesson commit ' + commitIndex + quote;
  });
};

var getLessonByName = function(name) {
  var matchingLevel = null;
  lessonSequenceKeys.forEach(function(sequenceKey) {
    levels.levelSequences[sequenceKey].forEach(function(levelBlob) {
      if (levelBlob.name.en_US === name) {
        matchingLevel = levelBlob;
      }
    });
  });
  return matchingLevel;
};

var expectLevelResetToRestoreLessonStart = function(levelBlob) {
  return base.runLevelCommands(levelBlob, solutionWithPrerequisites(levelBlob))
    .then(function(result) {
      var headless = result.headless;

      expect(result.solved).toBeTruthy(
        'Expected "' + levelBlob.name.en_US + '" setup to solve before reset'
      );

      headless.gitEngine.setLocalChangeState(
        {
          'reset-working-artifact.txt': {
            type: 'added',
            content: 'Reset should remove this working change'
          }
        },
        {
          'reset-staged-artifact.txt': {
            type: 'added',
            content: 'Reset should remove this staged change'
          }
        }
      );
      headless.gitEngine.mockPullConflictConsumed = true;
      headless.gitEngine.activeConflict = {
        filepath: 'reset-conflict.txt',
        resolved: false
      };

      if (levelBlob.initialGitConfig) {
        headless.gitEngine.setConfigState({
          'user.name': 'Wrong Name',
          'user.email': 'wrong@example.com'
        });
      }

      Visualization.prototype.reset.call({
        treeString: levelBlob.startTree,
        options: levelBlob,
        originVis: null,
        setTreeOpacity: function() {},
        fadeTreeIn: function() {},
        applyInitialLocalState: Visualization.prototype.applyInitialLocalState,
        gitEngine: headless.gitEngine
      });

      if (levelBlob.startTree) {
        expect(TreeCompare.dispatch(
          {},
          levelBlob.startTree,
          headless.gitEngine.printTree()
        )).toBeTruthy(
          'Expected "' + levelBlob.name.en_US + '" to reset to its start tree'
        );
      }

      expect(headless.gitEngine.workingDirectoryChanges).toEqual(
        levelBlob.initialWorkingDirectoryChanges || {}
      );
      expect(headless.gitEngine.stagedChanges).toEqual(
        levelBlob.initialStagedChanges || {}
      );

      if (levelBlob.initialGitConfig) {
        expect(headless.gitEngine.gitConfig).toEqual(levelBlob.initialGitConfig);
      }

      expect(headless.gitEngine.mockPullConflictConsumed).toBe(false);
      expect(headless.gitEngine.activeConflict).toBe(null);
    });
};

var failureCasesByLesson = {
  'Clone The Repo': [
    {
      name: 'does not solve without cloning',
      command: 'git status'
    }
  ],
  'Set Up Your Git Identity': [
    {
      name: 'does not solve when only the user name is configured',
      command: 'git config user.name Student'
    }
  ],
  'Your First Snapshot': [
    {
      name: 'does not solve when the file is never committed',
      command: withIdentity('touch hello.txt;git status;git add hello.txt;git status')
    }
  ],
  'What Did I Change?': [
    {
      name: 'does not solve without inspecting the staged diff',
      command: 'touch notes.txt;echo "New file content" > notes.txt;git status;git diff;git add notes.txt;git status'
    }
  ],
  'Checking The Commit History': [
    {
      name: 'does not solve when the new commit history is not checked',
      command: withIdentity('touch history.txt;git add history.txt;git commit -m "Add history.txt"')
    }
  ],
  'Publishing Your Work': [
    {
      name: 'does not solve when the commit is not pushed',
      command: withIdentity('git clone;touch publish.txt;git add publish.txt;git commit -m "Add publish.txt"')
    }
  ],
  'Git Branches': [
    {
      name: 'does not solve when the new branch is not checked out',
      command: 'git branch bugFix'
    }
  ],
  'Publishing A Branch': [
    {
      name: 'does not solve when the branch is pushed without upstream tracking',
      command: withIdentity('git checkout -b feature;touch feature.txt;git add feature.txt;git commit -m "Add feature.txt";git push origin feature')
    },
    {
      name: 'does not solve when plain git push is used without setting upstream tracking',
      command: withIdentity('git checkout -b feature;touch feature.txt;git add feature.txt;git commit -m "Add feature.txt";git push')
    }
  ],
  'Bringing Work Back Together': [
    {
      name: 'does not solve when the feature branch is not merged into main',
      command: withIdentity('git checkout -b feature;touch feature.txt;git add feature.txt;git commit -m "Add feature.txt";git checkout main')
    }
  ],
  'Merging With Diverging': [
    {
      name: 'does not solve when main has no independent commit before merging',
      command: withIdentity('touch feature.txt;git add feature.txt;git commit -m "Add feature.txt";git checkout main;git merge feature')
    }
  ],
  'Undo Local Changes': [
    {
      name: 'does not solve when draft.txt is left dirty',
      command: 'git unstage draft.txt'
    }
  ],
  'Undo Commits Safely': [
    {
      name: 'does not solve when reset is used instead of revert',
      command: 'git reset --hard HEAD~2;git push --force'
    },
    {
      name: 'does not solve when the latest commit is reverted instead of the unwanted older commit',
      command: 'git revert HEAD;git push'
    }
  ],
  'Selective Commit Reverts': [
    {
      name: 'does not solve when only one unwanted commit is reverted',
      command: 'git revert HEAD~3;git push'
    },
    {
      name: 'does not solve when the documentation commit is reverted',
      command: 'git revert HEAD;git revert HEAD~3;git revert HEAD~2;git push'
    }
  ],
  'Rewind Local History': [
    {
      name: 'does not solve when the soft reset is skipped',
      command: 'git reset --hard HEAD~1;git status'
    }
  ],
  'Download Without Changing': [
    {
      name: 'does not solve by pulling instead of fetching',
      command: 'git pull'
    }
  ],
  'Sync Your Local Copy': [
    {
      name: 'does not solve when teammate work is fetched but not pulled into main',
      command: 'git fakeTeamwork 2;git fetch'
    }
  ],
  'Collaborating Without Conflicting': [
    {
      name: 'does not solve when the conflict is not resolved before pushing',
      command: withIdentity('git fakeTeamwork shared.txt;git pull;git push')
    }
  ],
  'Replay Your Work On The Latest Main': [
    {
      name: 'does not solve when pull creates a merge instead of replaying work',
      command: withIdentity('git fakeTeamwork 1;touch replay.txt;git add replay.txt;git commit -m "Update replay.txt";git pull;git push')
    }
  ],
  'The Emergency Override': [
    {
      name: 'does not solve when the rewritten history is pushed without force',
      command: withIdentity('touch first.txt;git add first.txt;git commit -m "Add first version";git push;git reset --hard HEAD~1;touch replacement.txt;git add replacement.txt;git commit -m "Add replacement version";git push')
    }
  ],
  'Pick The Good Parts': [
    {
      name: 'does not solve when only one selected commit is cherry-picked',
      command: 'git cherry-pick C3'
    }
  ]
};

describe('Lesson section validation', function() {
  it('keeps practice exercises out of the lesson suite', function() {
    expect(lessonSequenceKeys).not.toContain('practiceExercises');
  });

  it('solves "What Did I Change?" with any non-empty echo message', function() {
    return base.expectLevelCommandsToSolve(
      getLessonByName('What Did I Change?'),
      'touch notes.txt;echo "A different note" > notes.txt;git status;git diff;git add notes.txt;git status;git diff --staged'
    );
  });

  it('errors in "Publishing A Branch" when plain git push is used before upstream tracking exists', function() {
    return base.expectLevelCommandToError(
      getLessonByName('Publishing A Branch'),
      withIdentity('git checkout -b feature;touch feature.txt;git add feature.txt;git commit -m "Add feature.txt";git push'),
      'The current branch has no upstream branch. Use git push -u origin feature to publish it and set upstream tracking.'
    );
  });

  it('solves "Rewind Local History" without requiring git status checks', function() {
    return base.expectLevelCommandsToSolve(
      getLessonByName('Rewind Local History'),
      withIdentity('git reset --soft HEAD~1;git commit -m "Recommit rewind";git reset --hard HEAD~1')
    );
  });

  it('solves "Download Without Changing" when fetching both branches separately', function() {
    return base.expectLevelCommandsToSolve(
      getLessonByName('Download Without Changing'),
      'git fetch origin main;git fetch origin bugFix'
    );
  });

  it('solves "Sync Your Local Copy" with fetch followed by merge', function() {
    return base.expectLevelCommandsToSolve(
      getLessonByName('Sync Your Local Copy'),
      'git fakeTeamwork 2;git fetch;git merge o/main'
    );
  });

  it('solves "Sync Your Local Copy" when teammate work is created in two steps', function() {
    return base.expectLevelCommandsToSolve(
      getLessonByName('Sync Your Local Copy'),
      'git fakeTeamwork;git fakeTeamwork;git pull'
    );
  });

  it('solves "Collaborating Without Conflicting" without requiring git diff', function() {
    return base.expectLevelCommandsToSolve(
      getLessonByName('Collaborating Without Conflicting'),
      withIdentity('git fakeTeamwork shared.txt;git pull;git resolve-conflict shared.txt;git add shared.txt;git commit -m "Resolve shared.txt conflict";git push')
    );
  });

  it('shows conflict markers for "Collaborating Without Conflicting" after pull', function() {
    return base.runLevelCommands(
      getLessonByName('Collaborating Without Conflicting'),
      'git fakeTeamwork shared.txt;git pull'
    ).then(function(result) {
      var change = result.headless.gitEngine.workingDirectoryChanges['shared.txt'];

      expect(change).toBeTruthy();
      expect(change.content).toContain('<<<<<<< HEAD');
      expect(change.content).toContain('My local update');
      expect(change.content).toContain('Teammate update');
      expect(change.content).toContain('>>>>>>> o/main');
    });
  });

  it('shows real previous content in the "Collaborating Without Conflicting" diff', function() {
    return base.runLevelCommands(
      getLessonByName('Collaborating Without Conflicting'),
      'git fakeTeamwork shared.txt;git pull;git diff'
    ).then(function(result) {
      var diffCommand = result.commands[result.commands.length - 1];
      var diffOutput = diffCommand.get('error').get('msg');

      expect(diffOutput).toContain('- Project plan');
      expect(diffOutput).toContain('+ <<<<<<< HEAD');
      expect(diffOutput).toContain('+ My local update');
      expect(diffOutput).toContain('+ Teammate update');
      expect(diffOutput).not.toContain('+ Project plan');
      expect(diffOutput).not.toContain('old file content');
    });
  });

  it('shows the resolved local change in the "Collaborating Without Conflicting" diff', function() {
    return base.runLevelCommands(
      getLessonByName('Collaborating Without Conflicting'),
      'git fakeTeamwork shared.txt;git pull;git resolve-conflict shared.txt;git diff'
    ).then(function(result) {
      var diffCommand = result.commands[result.commands.length - 1];
      var diffOutput = diffCommand.get('error').get('msg');

      expect(diffOutput).toContain('- Project plan');
      expect(diffOutput).toContain('+ My local update');
      expect(diffOutput).not.toContain('+ Project plan');
      expect(diffOutput).not.toContain('old file content');
      expect(diffOutput).not.toContain('Teammate update');
      expect(diffOutput).not.toContain('<<<<<<< HEAD');
    });
  });

  lessonSequenceKeys.forEach(function(sequenceKey) {
    describe(levels.sequenceInfo[sequenceKey].displayName.en_US, function() {
      levels.levelSequences[sequenceKey].forEach(function(levelBlob) {
        it('solves lesson "' + levelBlob.name.en_US + '" with its guided solution', function() {
          return base.expectLevelCommandsToSolve(
            levelBlob,
            solutionWithPrerequisites(levelBlob)
          );
        });

        it('resets lesson "' + levelBlob.name.en_US + '" to its configured start state', function() {
          return expectLevelResetToRestoreLessonStart(levelBlob);
        });

        if (/git +commit/.test(levelBlob.solutionCommand || '')) {
          it('solves lesson "' + levelBlob.name.en_US + '" with alternate commit messages', function() {
            return base.expectLevelCommandsToSolve(
              levelBlob,
              commandWithAlternateCommitMessages(solutionWithPrerequisites(levelBlob))
            );
          });
        }

        (failureCasesByLesson[levelBlob.name.en_US] || []).forEach(function(failureCase) {
          it(failureCase.name, function() {
            return base.expectLevelCommandsNotToSolve(
              levelBlob,
              failureCase.command
            );
          });
        });
      });
    });
  });
});
