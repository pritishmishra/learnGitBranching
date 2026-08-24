var base = require('../base');

var exercises = require('../../src/levels/index').levelSequences.practiceExercises;

var getExercise = function(number) {
  return exercises[number - 1];
};

describe('Practice exercise validation', function() {
  it('solves exercise 1 with the required workflow and extra commands', function() {
    return base.expectLevelCommandsToSolve(
      getExercise(1),
      [
        'git clone',
        'git status',
        'git config user.name Student',
        'git config user.email student@example.com',
        'touch introduction.txt',
        'git add introduction.txt',
        'git commit -m "Introduce myself"',
        'git push'
      ].join(';')
    );
  });

  it('does not solve exercise 1 when the email config command is skipped', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(1),
      [
        'git clone',
        'git config user.name Student',
        'touch introduction.txt',
        'git add introduction.txt',
        'git commit -m "Introduce myself"',
        'git push'
      ].join(';')
    );
  });

  it('solves exercise 4 with any non-empty replacement commit message', function() {
    return base.expectLevelCommandsToSolve(
      getExercise(4),
      [
        'git reset --soft HEAD~1',
        'touch review.txt',
        'git add review.txt',
        'git commit -m "Ready for review"'
      ].join(';')
    );
  });

  it('does not solve exercise 4 when hard reset drops the staged draft change', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(4),
      [
        'git reset --hard HEAD~1',
        'touch review.txt',
        'git add review.txt',
        'git commit -m "Ready for review"'
      ].join(';')
    );
  });

  it('solves exercise 5 when extra commands appear between required commands', function() {
    return base.expectLevelCommandsToSolve(
      getExercise(5),
      [
        'git status',
        'git log',
        'git status',
        'git revert HEAD~1',
        'git status',
        'git push origin main'
      ].join(';')
    );
  });

  it('does not solve exercise 5 when history is reset instead of reverted', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(5),
      [
        'git log',
        'git reset --hard HEAD~1',
        'git push origin main'
      ].join(';')
    );
  });

  it('solves exercise 6 by fetching, rebasing, and publishing the feature branch', function() {
    return base.expectLevelCommandsToSolve(
      getExercise(6),
      [
        'git fetch',
        'git rebase o/main',
        'git push -u origin feature-notifications'
      ].join(';')
    );
  });

  it('does not solve exercise 6 when a merge commit is created instead of rebasing', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(6),
      [
        'git fetch',
        'git merge o/main',
        'git push -u origin feature-notifications'
      ].join(';')
    );
  });
});
