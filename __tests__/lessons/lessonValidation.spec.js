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
      command: 'touch notes.txt;git status;git diff;git add notes.txt;git status'
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
  'Work On A Separate Timeline': [
    {
      name: 'does not solve when the new branch is not checked out',
      command: 'git branch bugFix'
    }
  ],
  'Publishing A Branch': [
    {
      name: 'does not solve when the branch is pushed without upstream tracking',
      command: withIdentity('git checkout -b feature;touch feature.txt;git add feature.txt;git commit -m "Add feature.txt";git push origin feature')
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
      command: withIdentity('git checkout -b feature;touch feature.txt;git add feature.txt;git commit -m "Add feature.txt";git checkout main;git merge feature')
    }
  ],
  'Undo Local Changes': [
    {
      name: 'does not solve when staged.txt is left dirty',
      command: 'git status;git restore scratch.txt;git add staged.txt;git unstage staged.txt'
    }
  ],
  'Undo Commits Safely': [
    {
      name: 'does not solve when reset is used instead of revert',
      command: withIdentity('touch revert.txt;git add revert.txt;git commit -m "Add revert.txt";git push;git reset --hard HEAD~1;git push --force')
    }
  ],
  'Rewind Local History': [
    {
      name: 'does not solve when the soft reset is skipped',
      command: withIdentity('touch rewind.txt;git add rewind.txt;git commit -m "Add rewind.txt";git reset --hard HEAD~1;git status')
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
      command: withIdentity('git fakeTeamwork 2;touch local.txt;git add local.txt;git commit -m "Add local.txt";git fetch')
    }
  ],
  'Collaborating Without Conflicting': [
    {
      name: 'does not solve when the conflict is not resolved before pushing',
      command: withIdentity('git fakeTeamwork 1;touch shared.txt;git add shared.txt;git commit -m "Update shared.txt";git pull;git push')
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
