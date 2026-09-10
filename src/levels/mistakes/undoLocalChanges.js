exports.level = {
  "name": {
    "en_US": "Undo Local Changes"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git unstage draft.txt;git restore draft.txt",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "startCommand": "git status",
  "initialStagedChanges": {
    "draft.txt": {
      "type": "added",
      "content": "Draft notes"
    }
  },
  "hint": {
    "en_US": "Use git unstage draft.txt to move the file out of the staging area, then git restore draft.txt to discard it."
  },
  "requireCleanWorkingTreeForCompletion": true,
  "requiredCommandPatterns": [
    "^git +unstage +draft\\.txt *$",
    "^git +restore +draft\\.txt *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Undo Local Changes",
              "",
              "Before you save a snapshot with a commit, Git lets you correct mistakes in two places: the working directory and the staging area.",
              "",
              "Suppose you edit or create a file, then run `git add <file>`. Git moves that change into the staging area, which means it is ready to be included in the next commit.",
              "",
              "If you realize that staged change should not be committed, use `git unstage <file>` to move it back out of the staging area. For example:",
              "",
              "```",
              "git unstage draft.txt",
              "```",
              "",
              "`git unstage` does not delete the change. It moves the file back to \"Changes not staged for commit.\"",
              "",
              "After that, use `git restore <file>` if you also want to discard the file change."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "`draft.txt` has already been created and staged for commit.",
              "",
              "The lesson starts by running `git status` so you can see that `draft.txt` is staged.",
              "",
              "You can run `git status` after each step to check how Git sees the file.",
              "",
              "**1. Unstage `draft.txt`**",
              "",
              "```",
              "git unstage draft.txt",
              "```",
              "",
              "**2. Restore `draft.txt`**",
              "",
              "```",
              "git restore draft.txt",
              "```",
              "",
              "Target state: when you are done, `git status` should show:",
              "",
              "```",
              "# On branch main",
              "# nothing to commit, working tree clean",
              "```",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
