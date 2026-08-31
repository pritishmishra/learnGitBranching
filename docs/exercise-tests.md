# Exercise Test Coverage

This document describes the standalone practice exercise tests. It focuses on
the student behavior each test checks, not on the test implementation.

Run this suite with:

```bash
yarn test:exercises
```

## Exercises

### Exercise 1: First Day on the Repo

This test checks that the exercise passes when the student completes the full
first-contribution workflow:

1. Clone the repository.
2. Check the repository status along the way.
3. Configure `user.name` as `Student`.
4. Configure `user.email` as `student@example.com`.
5. Create `introduction.txt`.
6. Stage `introduction.txt`.
7. Commit it with a non-empty message.
8. Push the new commit.

This test also checks that the exercise passes when the student pushes with
`git push origin main` instead of plain `git push`.

This test also checks that the exercise fails if the student skips the
`user.email` configuration step, even if the rest of the workflow is completed.

This test also checks that the exercise fails if the student configures the
wrong user name or email instead of `Student` and `student@example.com`.

This test also checks that the exercise fails if the student creates and commits
a file with the wrong name instead of `introduction.txt`.

This test also checks that the exercise fails if the student commits the file
but never pushes it.

This test also checks that the exercise fails if the student tries to commit
with an empty commit message.

This test also checks that `git status`, `touch`, `git add`, `git config`, and
`git commit` fail before the student clones the repository.

### Exercise 2: Two Timelines, One History

This test checks that the exercise passes when the student creates
`feature-profile`, commits `profile.txt` on that branch, returns to `main`,
commits `hotfix.txt`, and merges `feature-profile` back into `main`.

This test also checks that the exercise passes when the student uses different
filenames for the feature and hotfix commits.

This test also checks that the exercise fails if the student commits
`profile.txt` on `main` instead of doing that work on `feature-profile`.

This test also checks that the exercise fails if the student completes the merge
but finishes on `feature-profile` instead of `main`.

This test also checks that the exercise fails if the student only creates one
line of work instead of creating separate feature and hotfix commits before the
merge.

### Exercise 3: Clean Up Before You Commit

This test checks that the exercise passes when the student restores the deleted
`settings.txt` file, unstages `notes.txt` while keeping it in the working
directory, creates `submission.txt`, stages it, and commits only that intended
submission file.

This test also checks that the exercise passes when the student unstages
`notes.txt` with `git restore --staged notes.txt`.

This test also checks that the exercise fails if the student creates and commits
the wrong submission filename instead of `submission.txt`.

This test also checks that the exercise fails if the student commits `notes.txt`
along with `submission.txt`.

This test also checks that the exercise fails if the student deletes `notes.txt`
instead of keeping it unstaged in the working directory.

This test also checks that the exercise fails if the student never restores
`settings.txt`.

### Exercise 4: Too Soon - Rebuild the Commit

This test checks that the exercise passes when the student uses
`git reset --soft HEAD~1` to undo the early local commit while keeping its
changes staged, then creates and stages `review.txt`, and commits both files
together with any non-empty commit message.

This test also checks that the exercise fails if the student uses plain
`git reset HEAD~1` instead of `git reset --soft HEAD~1`.

This test also checks that the exercise fails if the student uses
`git reset --hard HEAD~1`, because that drops the staged `draft.txt` change
instead of preserving it for the replacement commit.

This test also checks that the exercise fails if the student commits
`draft.txt` and `review.txt` as two separate commits instead of rebuilding one
combined replacement commit.

This test also checks that the exercise fails if the replacement commit loses
the original `draft.txt` change.

This test also checks that the exercise fails if the student creates and commits
the wrong follow-up filename instead of `review.txt`.

### Exercise 5: Undo Without Erasing History

This test checks that the exercise passes when the student reverts the
second-most-recent commit with `git revert HEAD~1`, and pushes the new revert
commit. `git log` is not required. The test allows extra commands, such as
`git status`, between the required steps.

This test also checks that the exercise passes when the student reverts the
specific commit id `C1`.

This test also checks that the exercise fails if the student uses
`git reset --hard HEAD~1` instead of `git revert HEAD~1`, because resetting
rewrites history instead of adding a new commit that safely undoes the pushed
change.

This test also checks that the exercise fails if the student reverts `HEAD`
instead of `HEAD~1`, because that targets the wrong commit.

This test also checks that the exercise fails if the student creates the revert
commit but does not push it.

### Exercise 6: Catch Up Without a Merge

This test checks that the exercise passes when the student fetches the updated
remote `main`, rebases `feature-notifications` onto `o/main`, and pushes the
feature branch with upstream tracking using:

```bash
git push -u origin feature-notifications
```

This test also checks that the exercise passes when the student fetches with
`git fetch origin`.

This test also checks that the exercise passes when the student pushes with
`git push --set-upstream origin feature-notifications`.

This test also checks that the exercise fails if the student creates a merge
commit with `git merge o/main` instead of rebasing, because the exercise is
specifically about catching up without a merge.

This test also checks that the exercise fails if the student rebases before
fetching, because that replays the feature work onto stale remote-tracking state.

This test also checks that the exercise fails if the student pushes the feature
branch without configuring upstream tracking.

This test also checks that the exercise fails if the student finishes on `main`
instead of `feature-notifications`.

## Exercise Command Availability

This test checks that `show solution` is not available while the active level is
an exercise.

This test also checks that `hint` is not available while the active level is an
exercise.

The same tests check that lessons outside the Exercises tab can still use both
commands.

## Future Lesson Tests

This document covers only the standalone Exercises tab. When we add a similar
targeted suite for the Lessons tab, document those tests separately so lesson
coverage and exercise coverage stay easy to scan.
