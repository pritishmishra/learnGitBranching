var base = require('../base');
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
      });
    });
  });
});
