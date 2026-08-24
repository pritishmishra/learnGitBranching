# LearnGitBranching Fork

This project is a teaching-focused fork of the original
[Learn Git Branching](https://github.com/pcottle/learnGitBranching) project.

The original README has been preserved at
[docs/original-learnGitBranching-README.md](docs/original-learnGitBranching-README.md).
Use that file, or the upstream repository, for background on the original
application, build history, contributors, and general Learn Git Branching
details.

## Product Structure

This fork keeps the interactive Git visualization from Learn Git Branching, but
reorganizes the learning experience around a more guided curriculum.

The level picker now has three top-level tabs:

- **Lessons**: the structured teaching path for students.
- **Exercises**: standalone practice exercises that reinforce the lesson path.
- **Legacy**: the original Learn Git Branching level sequences that are not part
  of the new guided curriculum.

### Lessons

The current Lessons tab contains:

- **Basic Git Workflow**
  - Clone the repo
  - Set up your git identity
  - Your First Snapshot
  - What did I change?
  - Checking the commit history
  - Publishing your work

- **Branching & Merging**
  - Work on a Separate Timeline
  - Publishing a branch
  - Bringing Work Back Together
  - Merging with Diverging

- **Correcting Mistakes**
  - Undo Local Changes
  - Undo Commits Safely
  - Rewind Local History

- **Working with a Team**
  - Download without Changing
  - Sync Your Local Copy
  - Collaborating Without Conflicting
  - Replay Your Work on the Latest Main

- **Advanced Topics**
  - The Emergency Override
  - Pick the Good Parts

### Exercises

The Exercises tab contains standalone practice scenarios. Exercises 1-5 are
implemented; remaining exercises have placeholder screens until their challenge
instructions and validation are designed.

- **Exercises**
  - First Day on the Repo
  - Two Timelines, One History
  - Clean Up Before You Commit
  - Too Soon - Rebuild the Commit
  - Undo Without Erasing History
  - Catch Up Without a Merge

### Legacy

Legacy contains the remaining original local and remote Learn Git Branching
sections. These are kept available for reference and advanced exploration, but
they are not the primary student path in this fork.

## Developer Notes

### Running The App

Install dependencies with Yarn:

```bash
yarn install
```

Run the Vite dev server:

```bash
yarn dev
```

Useful package scripts are defined in [package.json](package.json):

- `yarn dev`: start the local development server.
- `yarn prepare`: run `gulp fastBuild`.
- `yarn test`: run the test suite through Gulp.
- `yarn test:coverage`: run tests with coverage.

This is still a client-side JavaScript application. The main app behavior lives
under [src/js](src/js), and level definitions live under [src/levels](src/levels).

### Level Organization

Level sequences are registered in [src/levels/index.js](src/levels/index.js).
That file controls:

- the order of levels inside each sequence
- the display name and description for each sequence
- which top-level tab a sequence belongs to

Current tab values are:

- `lessons`
- `exercises`
- `legacy`

The level dropdown UI is in
[src/js/views/levelDropdownView.js](src/js/views/levelDropdownView.js). The tab
labels are in [src/js/intl/strings.js](src/js/intl/strings.js).

### Adding Or Editing A Level

Most level files export one object:

```js
exports.level = {
  name: { en_US: 'Level Name' },
  startTree: '...',
  goalTreeString: '...',
  solutionCommand: '...',
  startDialog: { ... }
};
```

Common fields used by this fork:

- `startTree`: initial commit graph.
- `goalTreeString`: graph required for completion.
- `solutionCommand`: reference solution.
- `requiredCommandPatterns`: ordered command regexes. Extra commands may appear
  between required commands.
- `requiredAnyOrderCommandPatterns`: required command regexes that can appear in
  any order.
- `requireStagedChanges`: makes `git commit` require staged file changes.
- `requireStagedChangesForCompletion`: level passes only when something is
  staged.
- `requireCleanWorkingTreeForCompletion`: level passes only when both staged and
  unstaged changes are clean.
- `initialWorkingDirectoryChanges`: seed local unstaged file changes at level
  start.
- `initialStagedChanges`: seed staged file changes at level start.
- `expectedHeadFileChanges`: require the final `HEAD` commit to contain exactly
  the listed file changes.
- `expectedWorkingDirectoryChanges`: require the final unstaged working
  directory changes to match the listed file changes.
- `expectedStagedChanges`: require the final staging area to match the listed
  file changes. Use `{}` to require an empty staging area.
- `mockConflictOnPull`: lesson-scoped teaching hook that makes `git pull`
  fetch remote work, pause before the merge, and create a simulated conflict in
  the configured file.

When adding a new level:

1. Create a file under the appropriate directory in [src/levels](src/levels).
2. Add it to the right sequence in [src/levels/index.js](src/levels/index.js).
3. Add focused validation with `requiredCommandPatterns` when graph state alone
   is not enough.
4. Run at least `git diff --check`; run the app/tests when Node and Yarn are
   available.

### Command Implementation

Command parsing and command-level validation are mostly in
[src/js/git/commands.js](src/js/git/commands.js).

Git engine behavior is mostly in [src/js/git/index.js](src/js/git/index.js).

Examples from this fork:

- `touch <file>` and `rm <file>` are standalone commands used instead of the old
  `git add-file` and `git delete-file` teaching commands.
- `git diff`, `git diff --staged`, and `git diff --cached` inspect simulated
  working-directory and staged changes.
- `git restore <file>` discards an unstaged local change.
- `git restore --staged <file>` and `git unstage <file>` move a staged change
  back to the working directory.
- `git resolve-conflict <file>` is a simulator-only teaching command. It marks a
  mocked merge conflict as resolved so the student can stage and commit the
  merge in conflict-focused lessons.
- `git reset --soft <target>` rewinds the branch and keeps rewound changes
  staged.
- `git reset --hard <target>` rewinds the branch and discards staged/unstaged
  local changes.
- `git push -u origin <branch>` is supported for publishing a branch and setting
  upstream tracking.
- `git push --force` and `git push -f` are supported for force-push lessons.

### Hidden Commands And Autocomplete

Some original commands are intentionally hidden from `show commands` and
autocomplete so students only see the commands relevant to this curriculum.

The configuration lives in [src/js/sandbox/commands.js](src/js/sandbox/commands.js):

- `hiddenCommands`
- `hiddenGitCommands`
- `isCommandHidden`

Autocomplete filtering is wired through
[src/js/views/commandViews.js](src/js/views/commandViews.js).

### Lesson UI Changes

Notable fork-specific UI behavior:

- The level picker uses **Lessons**, **Exercises**, and **Legacy** tabs.
- The Exercises tab renders practice placeholders as one exercise per row with
  numbered buttons.
- The success dialog was simplified and no longer shows command-count
  calculations.
- The local/remote visualization can label the two repository views.
- Some promotional links and old external links were removed from the page.

### Deployment Scripts

The repository still includes deployment helper scripts such as
[apache.sh](apache.sh) and [nginx.sh](nginx.sh). These are project-specific
deployment wrappers around the built static app. Review them before running on a
server, especially user permissions and dependency assumptions.
