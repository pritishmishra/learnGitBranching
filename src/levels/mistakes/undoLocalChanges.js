exports.level = {
  "name": {
    "en_US": "Undo Local Changes"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git status;git restore scratch.txt;git status;git add staged.txt;git status;git unstage staged.txt;git status;git restore staged.txt",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "initialWorkingDirectoryChanges": {
    "scratch.txt": {
      "type": "added",
      "content": "Scratch notes"
    },
    "staged.txt": {
      "type": "added",
      "content": "Staged draft"
    }
  },
  "hint": {
    "en_US": "Use git restore to discard unstaged changes, and git unstage before restoring staged changes"
  },
  "requireCleanWorkingTreeForCompletion": true,
  "requiredCommandPatterns": [
    "^git +status *$",
    "^git +restore +scratch\\.txt *$",
    "^git +status *$",
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
              "Before you save a snapshot with a commit, Git lets you correct mistakes in two places: the working directory and the staging area.",
              "",
              "Suppose you edit or create a file, then run `git status`. Git shows that file under \"Changes not staged for commit.\" That means the change is unstaged.",
              "",
              "If you decide that unstaged change was a mistake, use `git restore <file>` to discard it. For example:",
              "",
              "```",
              "git restore scratch.txt",
              "```"
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Now suppose you made a change and then ran `git add <file>`. Git moves that change into the staging area, which means it is ready to be included in the next commit.",
              "",
              "If you realize that staged change should not be committed yet, use `git unstage <file>`. For example:",
              "",
              "```",
              "git unstage staged.txt",
              "```",
              "",
              "`git unstage` does not delete the change. It moves the file back to \"Changes not staged for commit.\"",
              "",
              "After that, you can use `git restore staged.txt` if you also want to discard the file change."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "The GitHub repository has already been cloned for you.",
              "",
              "Two files have already been created in your working directory: `scratch.txt` and `staged.txt`. Neither file has been committed.",
              "",
              "Complete these steps in the terminal on the right:",
              "",
              "**1. Check the current changes**",
              "",
              "```",
              "git status",
              "```",
              "",
              "**2. Discard the unstaged scratch file**",
              "",
              "```",
              "git restore scratch.txt",
              "git status",
              "```",
              "",
              "**3. Stage the second file**",
              "",
              "```",
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
