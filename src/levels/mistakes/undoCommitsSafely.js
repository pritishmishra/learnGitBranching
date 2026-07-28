exports.level = {
  "name": {
    "en_US": "Undo Commits Safely"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C1'\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C1'\":{\"parents\":[\"C1\"],\"id\":\"C1'\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "touch revert.txt;git add revert.txt;git commit -m 'Add revert.txt';git revert HEAD",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Create one commit, then run git revert HEAD to undo it with a new commit"
  },
  "requireStagedChanges": true,
  "requiredCommandPatterns": [
    "^touch +revert\\.txt($| +)",
    "^git +add +revert\\.txt *$",
    "^git +commit +.*$",
    "^git +revert +HEAD *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Undo Commits Safely",
              "",
              "Sometimes the mistake has already been committed.",
              "",
              "`git revert <commit>` creates a new commit that undoes the changes from an older commit. It does not erase the old commit from history.",
              "",
              "That makes revert the safer choice when a commit may already have been shared with other people."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Revert a Commit",
              "",
              "Watch how `git revert HEAD` adds a new commit instead of moving `main` backward."
            ],
            "afterMarkdowns": [
              "The original commit is still in history, and the new commit records the undo operation."
            ],
            "command": "git revert HEAD",
            "beforeCommand": "touch revert.txt;git add revert.txt;git commit -m 'Add revert.txt'"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "The GitHub repository has already been cloned for you. Complete these steps in the terminal on the right:",
              "",
              "**1. Create a file**",
              "",
              "```",
              "touch revert.txt",
              "```",
              "",
              "**2. Stage it**",
              "",
              "```",
              "git add revert.txt",
              "```",
              "",
              "**3. Commit it**",
              "",
              "```",
              "git commit -m \"Add revert.txt\"",
              "```",
              "",
              "**4. Safely undo the commit**",
              "",
              "```",
              "git revert HEAD",
              "```",
              "",
              "The level is complete once `main` points to the new revert commit.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
