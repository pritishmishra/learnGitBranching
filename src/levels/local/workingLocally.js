exports.level = {
  "name": {
    "en_US": "Your First Snapshot"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "touch hello.txt;git status;git add hello.txt;git status;git commit -m 'Add hello.txt'",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Run: touch hello.txt, git status, git add hello.txt, git status, git commit -m \"...\""
  },
  "requireStagedChanges": true,
  "disabledMap": {
    "git revert": true
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your First Snapshot",
              "",
              "The GitHub repository has already been cloned for you, so you can start working in your local copy.",
              "",
              "In a real git workflow, every change you make goes through three areas:",
              "",
              "| Area | What it holds |",
              "|------|--------------|",
              "| **Working directory** | Your actual files (edited but not yet tracked) |",
              "| **Staging area** | Changes you've selected for the next commit |",
              "| **Repository** | Permanent snapshots (commits) |",
              "",
              "In this level you'll practice the complete local workflow:",
              "",
              "1. `touch` — create a new file in your working directory",
              "2. `git status` — inspect what Git sees in your working directory",
              "3. `git add` — move it to the staging area",
              "4. `git status` — confirm the change is staged",
              "5. `git commit -m` — save a permanent snapshot"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Create a Commit",
              "",
              "After you create and stage changes, the next step is to commit those changes.",
              "",
              "A commit saves a snapshot of the staged changes into the repository history.",
              "",
              "Watch how the new commit appears on the graph:"
            ],
            "afterMarkdowns": [
              "A new commit `C1` has been created on `main`!",
              "",
              "Each circle in the graph is a snapshot. The arrow points to the commit it was built on top of.",
              "",
              "Now try it yourself — create a file, stage it, and commit it with a message."
            ],
            "command": "git commit -m 'Add hello.txt'",
            "beforeCommand": "touch hello.txt;git status;git add hello.txt;git status"
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
              "```",
              "touch hello.txt",
              "```",
              "",
              "**2. Check the working directory**",
              "```",
              "git status",
              "```",
              "",
              "**3. Stage it**",
              "```",
              "git add hello.txt",
              "```",
              "",
              "**4. Check the staging area**",
              "```",
              "git status",
              "```",
              "",
              "**5. Commit it**",
              "```",
              "git commit -m \"Add hello.txt\"",
              "```",
              "",
              "The level is complete once `main` points to a new commit.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
