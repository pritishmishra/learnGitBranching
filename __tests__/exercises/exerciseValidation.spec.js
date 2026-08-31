var base = require('../base');

var exercises = require('../../src/levels/index').levelSequences.practiceExercises;
var CLONE_REQUIRED_MESSAGE =
  'You need to clone the repository before running Git commands in this exercise.';

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

  it('solves exercise 1 when the push explicitly names origin/main', function() {
    return base.expectLevelCommandsToSolve(
      getExercise(1),
      [
        'git clone',
        'git config user.name Student',
        'git config user.email student@example.com',
        'touch introduction.txt',
        'git add introduction.txt',
        'git commit -m "Introduce myself"',
        'git push origin main'
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

  it('does not solve exercise 1 when the configured identity is wrong', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(1),
      [
        'git clone',
        'git config user.name Other Student',
        'git config user.email other@example.com',
        'touch introduction.txt',
        'git add introduction.txt',
        'git commit -m "Introduce myself"',
        'git push'
      ].join(';')
    );
  });

  it('does not solve exercise 1 when the requested file has the wrong name', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(1),
      [
        'git clone',
        'git config user.name Student',
        'git config user.email student@example.com',
        'touch intro.txt',
        'git add intro.txt',
        'git commit -m "Introduce myself"',
        'git push'
      ].join(';')
    );
  });

  it('does not solve exercise 1 when the commit is not pushed', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(1),
      [
        'git clone',
        'git config user.name Student',
        'git config user.email student@example.com',
        'touch introduction.txt',
        'git add introduction.txt',
        'git commit -m "Introduce myself"'
      ].join(';')
    );
  });

  it('does not solve exercise 1 when the commit message is empty', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(1),
      [
        'git clone',
        'git config user.name Student',
        'git config user.email student@example.com',
        'touch introduction.txt',
        'git add introduction.txt',
        'git commit -m ""',
        'git push'
      ].join(';')
    );
  });

  it('fails git status before clone in exercise 1', function() {
    return base.expectLevelCommandToError(
      getExercise(1),
      'git status',
      CLONE_REQUIRED_MESSAGE
    );
  });

  it('fails touch before clone in exercise 1', function() {
    return base.expectLevelCommandToError(
      getExercise(1),
      'touch introduction.txt',
      CLONE_REQUIRED_MESSAGE
    );
  });

  it('fails git add before clone in exercise 1', function() {
    return base.expectLevelCommandToError(
      getExercise(1),
      'git add introduction.txt',
      CLONE_REQUIRED_MESSAGE
    );
  });

  it('fails git config before clone in exercise 1', function() {
    return base.expectLevelCommandToError(
      getExercise(1),
      'git config user.name Student',
      CLONE_REQUIRED_MESSAGE
    );
  });

  it('fails git commit before clone in exercise 1', function() {
    return base.expectLevelCommandToError(
      getExercise(1),
      'git commit -m "Introduce myself"',
      CLONE_REQUIRED_MESSAGE
    );
  });

  it('solves exercise 2 with separate feature and hotfix commits merged on main', function() {
    return base.expectLevelCommandsToSolve(
      getExercise(2),
      [
        'git checkout -b feature-profile',
        'touch profile.txt',
        'git add profile.txt',
        'git commit -m "Add profile"',
        'git checkout main',
        'touch hotfix.txt',
        'git add hotfix.txt',
        'git commit -m "Add hotfix"',
        'git merge feature-profile'
      ].join(';')
    );
  });

  it('does not solve exercise 2 when profile.txt is committed on main', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(2),
      [
        'touch profile.txt',
        'git add profile.txt',
        'git commit -m "Add profile"',
        'git checkout -b feature-profile',
        'git checkout main',
        'touch hotfix.txt',
        'git add hotfix.txt',
        'git commit -m "Add hotfix"',
        'git merge feature-profile'
      ].join(';')
    );
  });

  it('does not solve exercise 2 when the student finishes on feature-profile', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(2),
      [
        'git checkout -b feature-profile',
        'touch profile.txt',
        'git add profile.txt',
        'git commit -m "Add profile"',
        'git checkout main',
        'touch hotfix.txt',
        'git add hotfix.txt',
        'git commit -m "Add hotfix"',
        'git merge feature-profile',
        'git checkout feature-profile'
      ].join(';')
    );
  });

  it('does not solve exercise 2 when there is only one line of work', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(2),
      [
        'git checkout -b feature-profile',
        'touch profile.txt',
        'git add profile.txt',
        'git commit -m "Add profile"',
        'git checkout main',
        'git merge feature-profile'
      ].join(';')
    );
  });

  it('solves exercise 2 with arbitrary feature and hotfix filenames', function() {
    return base.expectLevelCommandsToSolve(
      getExercise(2),
      [
        'git checkout -b feature-profile',
        'touch user-profile.txt',
        'git add user-profile.txt',
        'git commit -m "Add profile"',
        'git checkout main',
        'touch urgent-fix.txt',
        'git add urgent-fix.txt',
        'git commit -m "Add hotfix"',
        'git merge feature-profile'
      ].join(';')
    );
  });

  it('solves exercise 3 by restoring, unstaging, and committing only submission.txt', function() {
    return base.expectLevelCommandsToSolve(
      getExercise(3),
      [
        'git restore settings.txt',
        'git unstage notes.txt',
        'touch submission.txt',
        'git add submission.txt',
        'git commit -m "Submit work"'
      ].join(';')
    );
  });

  it('solves exercise 3 when notes.txt is unstaged with git restore --staged', function() {
    return base.expectLevelCommandsToSolve(
      getExercise(3),
      [
        'git restore settings.txt',
        'git restore --staged notes.txt',
        'touch submission.txt',
        'git add submission.txt',
        'git commit -m "Submit work"'
      ].join(';')
    );
  });

  it('does not solve exercise 3 when the submission file has the wrong name', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(3),
      [
        'git restore settings.txt',
        'git unstage notes.txt',
        'touch final-submission.txt',
        'git add final-submission.txt',
        'git commit -m "Submit work"'
      ].join(';')
    );
  });

  it('does not solve exercise 3 when notes.txt is committed too', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(3),
      [
        'git restore settings.txt',
        'touch submission.txt',
        'git add submission.txt',
        'git commit -m "Submit work"'
      ].join(';')
    );
  });

  it('does not solve exercise 3 when notes.txt is deleted instead of kept unstaged', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(3),
      [
        'git restore settings.txt',
        'git unstage notes.txt',
        'rm notes.txt',
        'touch submission.txt',
        'git add submission.txt',
        'git commit -m "Submit work"'
      ].join(';')
    );
  });

  it('does not solve exercise 3 when settings.txt is not restored', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(3),
      [
        'git unstage notes.txt',
        'touch submission.txt',
        'git add submission.txt',
        'git commit -m "Submit work"'
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

  it('does not solve exercise 4 when the follow-up file has the wrong name', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(4),
      [
        'git reset --soft HEAD~1',
        'touch review-notes.txt',
        'git add review-notes.txt',
        'git commit -m "Ready for review"'
      ].join(';')
    );
  });

  it('does not solve exercise 4 when plain git reset is used instead of --soft', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(4),
      [
        'git reset HEAD~1',
        'touch review.txt',
        'git add review.txt',
        'git commit -m "Ready for review"'
      ].join(';')
    );
  });

  it('does not solve exercise 4 when draft.txt and review.txt are committed separately', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(4),
      [
        'git reset --soft HEAD~1',
        'git commit -m "Keep draft"',
        'touch review.txt',
        'git add review.txt',
        'git commit -m "Ready for review"'
      ].join(';')
    );
  });

  it('does not solve exercise 4 when the replacement commit loses draft.txt', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(4),
      [
        'git reset --soft HEAD~1',
        'git unstage draft.txt',
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

  it('solves exercise 5 without requiring git log', function() {
    return base.expectLevelCommandsToSolve(
      getExercise(5),
      [
        'git status',
        'git revert HEAD~1',
        'git status',
        'git push origin main'
      ].join(';')
    );
  });

  it('solves exercise 5 when the specific commit id is reverted', function() {
    return base.expectLevelCommandsToSolve(
      getExercise(5),
      [
        'git revert C1',
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

  it('does not solve exercise 5 when HEAD is reverted instead of HEAD~1', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(5),
      [
        'git log',
        'git revert HEAD',
        'git push origin main'
      ].join(';')
    );
  });

  it('does not solve exercise 5 when the revert commit is not pushed', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(5),
      [
        'git log',
        'git revert HEAD~1'
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

  it('solves exercise 6 when fetch explicitly names origin', function() {
    return base.expectLevelCommandsToSolve(
      getExercise(6),
      [
        'git fetch origin',
        'git rebase o/main',
        'git push -u origin feature-notifications'
      ].join(';')
    );
  });

  it('solves exercise 6 when push uses --set-upstream', function() {
    return base.expectLevelCommandsToSolve(
      getExercise(6),
      [
        'git fetch',
        'git rebase o/main',
        'git push --set-upstream origin feature-notifications'
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

  it('does not solve exercise 6 when the branch is rebased before fetching', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(6),
      [
        'git rebase o/main',
        'git fetch',
        'git push -u origin feature-notifications'
      ].join(';')
    );
  });

  it('does not solve exercise 6 when the push does not configure upstream tracking', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(6),
      [
        'git fetch',
        'git rebase o/main',
        'git push origin feature-notifications'
      ].join(';')
    );
  });

  it('does not solve exercise 6 when the student finishes on main', function() {
    return base.expectLevelCommandsNotToSolve(
      getExercise(6),
      [
        'git fetch',
        'git rebase o/main',
        'git push -u origin feature-notifications',
        'git checkout main'
      ].join(';')
    );
  });
});
