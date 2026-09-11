exports.level = {
  "name": {
    "en_US": "Rewind Local History"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git reset --soft HEAD~1;git status;git commit -m 'Add rewind.txt';git reset --hard HEAD~1;git status",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\",\"fileChanges\":{\"rewind.txt\":{\"type\":\"added\",\"content\":\"\"}}}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Use git reset --soft HEAD~1 to keep changes staged, then git reset --hard HEAD~1 to discard them"
  },
  "requireStagedChanges": true,
  "requireCleanWorkingTreeForCompletion": true,
  "requiredCommandPatterns": [
    "^git +reset +--soft +HEAD~1 *$",
    "^git +commit +.*$",
    "^git +reset +--hard +HEAD~1 *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Rewind Local History",
              "",
              "`git reset` moves the current branch to another commit. Unlike `git revert`, reset rewrites local history by moving the branch pointer.",
              "",
              "Use reset carefully. It is best for commits that are still local and have not been pushed to a remote branch."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`git reset --soft HEAD~1` moves `main` back one commit, but keeps the undone commit's file changes staged.",
              "",
              "After a soft reset, run `git status` to confirm that the file changes are in the staging area.",
              "",
              "Soft reset is useful when the commit was too early or had the wrong message, but the file changes are still worth keeping.",
              "",
              "`git reset --hard HEAD~1` moves `main` back one commit and discards the file changes too.",
              "",
              "Hard reset is useful when the local commit and its changes should both be thrown away."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Reset Moves the Branch",
              "",
              "Watch `main` move back one commit with `git reset --soft HEAD~1`.",
              "",
              "A hard reset would look the same in this commit graph because `git reset --hard HEAD~1` also moves `main` back one commit."
            ],
            "afterMarkdowns": [
              "Visually, both soft and hard reset move the branch back.",
              "",
              "The difference is what happens to the file changes: `--soft` keeps them staged, while `--hard` discards them."
            ],
            "command": "git reset --soft HEAD~1",
            "beforeCommand": "touch rewind.txt;git add rewind.txt;git commit -m 'Add rewind.txt'"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "Commit `C1` added `rewind.txt`, but has not been pushed to `main` yet.",
              "",
              "**1. Rewind the commit but keep the change staged**",
              "",
              "```",
              "git reset --soft HEAD~1",
              "```",
              "",
              "**2. Check that the change is staged**",
              "",
              "```",
              "git status",
              "```",
              "",
              "**3. Commit the staged change again**",
              "",
              "```",
              "git commit -m \"Add rewind.txt\"",
              "```",
              "",
              "**4. Rewind the commit and discard the change**",
              "",
              "```",
              "git reset --hard HEAD~1",
              "```",
              "",
              "**5. Check that the working tree is clean**",
              "",
              "```",
              "git status",
              "```",
              "",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
