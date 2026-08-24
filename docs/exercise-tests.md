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

This test also checks that the exercise fails if the student skips the
`user.email` configuration step, even if the rest of the workflow is completed.

### Exercise 4: Too Soon - Rebuild the Commit

This test checks that the exercise passes when the student uses
`git reset --soft HEAD~1` to undo the early local commit while keeping its
changes staged, then creates and stages `review.txt`, and commits both files
together with any non-empty commit message.

This test also checks that the exercise fails if the student uses
`git reset --hard HEAD~1`, because that drops the staged `draft.txt` change
instead of preserving it for the replacement commit.

### Exercise 5: Undo Without Erasing History

This test checks that the exercise passes when the student views history, reverts
the second-most-recent commit with `git revert HEAD~1`, and pushes the new revert
commit. The test allows extra commands, such as `git status`, between the
required steps.

This test also checks that the exercise fails if the student uses
`git reset --hard HEAD~1` instead of `git revert HEAD~1`, because resetting
rewrites history instead of adding a new commit that safely undoes the pushed
change.

### Exercise 6: Catch Up Without a Merge

This test checks that the exercise passes when the student fetches the updated
remote `main`, rebases `feature-notifications` onto `o/main`, and pushes the
feature branch with upstream tracking using:

```bash
git push -u origin feature-notifications
```

This test also checks that the exercise fails if the student creates a merge
commit with `git merge o/main` instead of rebasing, because the exercise is
specifically about catching up without a merge.

## Future Lesson Tests

This document covers only the standalone Exercises tab. When we add a similar
targeted suite for the Lessons tab, document those tests separately so lesson
coverage and exercise coverage stay easy to scan.
