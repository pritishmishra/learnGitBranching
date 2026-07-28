exports.level = {
  "name": {
    "en_US": "Rewind Local History"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "touch rewind.txt;git add rewind.txt;git commit -m 'Add rewind.txt';git reset --soft HEAD~1;git status;git commit -m 'Add rewind.txt';git reset --hard HEAD~1;git status",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Use git reset --soft HEAD~1 to keep changes staged, then git reset --hard HEAD~1 to discard them"
  },
  "requireStagedChanges": true,
  "requireCleanWorkingTreeForCompletion": true,
  "requiredCommandPatterns": [
    "^touch +rewind\\.txt($| +)",
    "^git +add +rewind\\.txt *$",
    "^git +commit +.*$",
    "^git +reset +--soft +HEAD~1 *$",
    "^git +status *$",
    "^git +commit +.*$",
    "^git +reset +--hard +HEAD~1 *$",
    "^git +status *$"
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
              "Use reset carefully. It is best for commits that are still local and have not been shared."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "`git reset --soft HEAD~1` moves `main` back one commit, but keeps the undone commit's file changes staged.",
              "",
              "That is useful when the commit was too early or had the wrong message, but the file changes are still worth keeping.",
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
              "### Soft Reset",
              "",
              "Watch `main` move backward while the file remains staged."
            ],
            "afterMarkdowns": [
              "`main` is back where it started, but `git status` still shows the file staged for commit."
            ],
            "command": "git reset --soft HEAD~1;git status",
            "beforeCommand": "touch rewind.txt;git add rewind.txt;git commit -m 'Add rewind.txt'"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Hard Reset",
              "",
              "Now watch `git reset --hard HEAD~1` move the branch backward and discard the local changes."
            ],
            "afterMarkdowns": [
              "After the hard reset, the branch is rewound and the working tree is clean."
            ],
            "command": "git reset --hard HEAD~1;git status",
            "beforeCommand": "touch rewind.txt;git add rewind.txt;git commit -m 'Add rewind.txt'"
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
              "**1. Create, stage, and commit a file**",
              "",
              "```",
              "touch rewind.txt",
              "git add rewind.txt",
              "git commit -m \"Add rewind.txt\"",
              "```",
              "",
              "**2. Rewind the commit but keep the change staged**",
              "",
              "```",
              "git reset --soft HEAD~1",
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
              "git status",
              "```",
              "",
              "The level is complete once `main` is rewound and the working tree is clean.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
