exports.level = {
  "name": {
    "en_US": "Undo Commits Safely"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C1'\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C1'\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C1'\":{\"parents\":[\"C1\"],\"id\":\"C1'\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C1'\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C1'\":{\"parents\":[\"C1\"],\"id\":\"C1'\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "touch revert.txt;git add revert.txt;git commit -m 'Add revert.txt';git push;git revert HEAD;git push",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Create and push one commit, then run git revert HEAD and push the revert commit"
  },
  "requireStagedChanges": true,
  "requiredCommandPatterns": [
    "^touch +revert\\.txt($| +)",
    "^git +add +revert\\.txt *$",
    "^git +commit +.*$",
    "^git +push *$",
    "^git +revert +HEAD *$",
    "^git +push *$"
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
              "That makes revert the safer choice when a commit may already have been pushed to a remote branch, or when another person may already have pulled it.",
              "",
              "In this exercise, you will push the commit first to make it shared. Then you will revert it and push the revert commit too.",
              "",
              "The important real-world habit is: if the commit is already shared, prefer `git revert` over rewriting history with `git reset`.",
              "",
              "In this exercise, you will use `git revert HEAD` to keep the task simple. `HEAD` means the current commit, so this reverts the latest commit on the current branch."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "In real projects, you will often choose a specific commit to revert.",
              "",
              "Common forms are:",
              "",
              "`git revert HEAD` reverts the current commit.",
              "",
              "`git revert HEAD~1` reverts one commit before `HEAD`.",
              "",
              "`git revert HEAD~3` reverts three commits before `HEAD`.",
              "",
              "`git revert abc123` reverts a specific commit id from `git log`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Revert a Commit",
              "",
              "Watch how `git revert HEAD` adds a new commit instead of moving `main` backward. Then `git push` publishes that undo commit to the remote."
            ],
            "afterMarkdowns": [
              "The original commit is still in history locally and on the remote, and the new commit records the undo operation."
            ],
            "command": "git revert HEAD;git push",
            "beforeCommand": "touch revert.txt;git add revert.txt;git commit -m 'Add revert.txt';git push"
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
              "**4. Push the commit**",
              "",
              "```",
              "git push",
              "```",
              "",
              "**5. Safely undo the pushed commit**",
              "",
              "```",
              "git revert HEAD",
              "```",
              "",
              "**6. Push the revert commit**",
              "",
              "```",
              "git push",
              "```",
              "",
              "We use `HEAD` here because the commit you want to undo is the latest commit. In real projects, you can also use forms like `git revert HEAD~1` or `git revert <commit-id>` when the commit is not the current one.",
              "",
              "The level is complete once local `main` and the remote both point to the new revert commit.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
