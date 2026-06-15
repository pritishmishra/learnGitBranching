exports.level = {
  "name": {
    "en_US": "Level 1: Working on a Local Repository"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}",
  "solutionCommand": "git config user.name 'Student';git config user.email 'student@example.com';touch hello.txt;git add hello.txt;git commit -m 'Add hello.txt'",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}",
  "hint": {
    "en_US": "Run: git config user.name \"...\", git config user.email \"...\", touch hello.txt, git add hello.txt, git commit -m \"...\""
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
              "1. `git config` — identify yourself to git",
              "2. `touch` — create a new file in your working directory",
              "3. `git add` — move it to the staging area",
              "4. `git commit -m` — save a permanent snapshot"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Configure, Stage, and Commit",
              "",
              "Before committing, git requires you to set your identity:",
              "",
              "```",
              "git config user.name  \"Your Name\"",
              "git config user.email \"your@email.com\"",
              "```",
              "",
              "Then create and stage a file, and commit:",
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
              "Now try it yourself — the commands are the same, just use your own name, email, and message."
            ],
            "command": "git commit -m 'Add hello.txt'",
            "beforeCommand": "git config user.name 'Student';git config user.email 'student@example.com';touch hello.txt;git add hello.txt"
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
              "**1. Set your identity**",
              "```",
              "git config user.name  \"Your Name\"",
              "git config user.email \"your@email.com\"",
              "```",
              "",
              "**2. Create a file**",
              "```",
              "touch hello.txt",
              "```",
              "",
              "**3. Stage it**",
              "```",
              "git add hello.txt",
              "```",
              "",
              "**4. Commit it**",
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
