exports.level = {
  "name": {
    "en_US": "Undo Local Changes"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "touch scratch.txt;git status;git restore scratch.txt;git status;touch staged.txt;git add staged.txt;git status;git unstage staged.txt;git status;git restore staged.txt",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Use git restore to discard unstaged changes, and git unstage before restoring staged changes"
  },
  "requireCleanWorkingTreeForCompletion": true,
  "requiredCommandPatterns": [
    "^touch +scratch\\.txt($| +)",
    "^git +status *$",
    "^git +restore +scratch\\.txt *$",
    "^git +status *$",
    "^touch +staged\\.txt($| +)",
    "^git +add +staged\\.txt *$",
    "^git +status *$",
    "^git +unstage +staged\\.txt *$",
    "^git +status *$",
    "^git +restore +staged\\.txt *$"
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
              "The GitHub repository has already been cloned for you.",
              "",
              "Mistakes happen before you commit. Sometimes you create or edit a file and decide you do not want that local change anymore.",
              "",
              "`git restore <file>` discards an unstaged change from your working directory."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Staged changes need one extra step.",
              "",
              "`git unstage <file>` moves a staged change back to the working directory. It does not delete the change.",
              "",
              "After a file is unstaged, `git restore <file>` can discard it."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Restore an Unstaged Change",
              "",
              "First, watch an unstaged local file disappear from Git's status after `git restore`."
            ],
            "afterMarkdowns": [
              "The working directory is clean again because the unstaged change was discarded."
            ],
            "command": "git restore scratch.txt;git status",
            "beforeCommand": "touch scratch.txt;git status"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Unstage Before Restoring",
              "",
              "Now watch a staged file move back to the working directory with `git unstage`, then get discarded with `git restore`."
            ],
            "afterMarkdowns": [
              "`git unstage` removed the file from staging, and `git restore` discarded the remaining working-directory change."
            ],
            "command": "git unstage staged.txt;git restore staged.txt;git status",
            "beforeCommand": "touch staged.txt;git add staged.txt;git status"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "Complete these steps in the terminal on the right:",
              "",
              "**1. Create an unstaged file**",
              "",
              "```",
              "touch scratch.txt",
              "git status",
              "```",
              "",
              "**2. Discard that unstaged file**",
              "",
              "```",
              "git restore scratch.txt",
              "git status",
              "```",
              "",
              "**3. Create and stage another file**",
              "",
              "```",
              "touch staged.txt",
              "git add staged.txt",
              "git status",
              "```",
              "",
              "**4. Unstage it**",
              "",
              "```",
              "git unstage staged.txt",
              "git status",
              "```",
              "",
              "**5. Discard the unstaged change**",
              "",
              "```",
              "git restore staged.txt",
              "```",
              "",
              "The level is complete once both the staging area and working directory are clean.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
