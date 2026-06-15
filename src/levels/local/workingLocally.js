exports.level = {
  "name": {
    "en_US": "Level 1: Working on a Local Repository"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}",
  "solutionCommand": "touch hello.txt;git add hello.txt;git commit -m 'Add hello.txt'",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}",
  "hint": {
    "en_US": "Run: touch hello.txt, git add hello.txt, git commit -m \"...\""
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
              "## Level 1: Working on a Local Repository",
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
              "2. `git add` — move it to the staging area",
              "3. `git commit -m` — save a permanent snapshot"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Create, Stage, and Commit",
              "",
              "Now that Git knows your identity, create and stage a file, then commit it:",
              "",
              "```",
              "touch hello.txt",
              "git add hello.txt",
              "git commit -m \"Add hello.txt\"",
              "```",
              "",
              "Watch a new commit appear on the graph when you hit the button:"
            ],
            "afterMarkdowns": [
              "A new commit `C1` has been created on `main`!",
              "",
              "Each circle in the graph is a snapshot. The arrow points to the commit it was built on top of.",
              "",
              "Now try it yourself — create a file, stage it, and commit it with a message."
            ],
            "command": "git commit -m 'Add hello.txt'",
            "beforeCommand": "touch hello.txt;git add hello.txt"
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
              "**1. Create a file**",
              "```",
              "touch hello.txt",
              "```",
              "",
              "**2. Stage it**",
              "```",
              "git add hello.txt",
              "```",
              "",
              "**3. Commit it**",
              "```",
              "git commit -m \"Add hello.txt\"",
              "```",
              "",
              "The level is complete once `main` points to a new commit."
            ]
          }
        }
      ]
    }
  }
};
