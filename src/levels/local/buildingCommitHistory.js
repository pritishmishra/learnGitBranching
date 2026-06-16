exports.level = {
  "name": {
    "en_US": "Building a Commit History"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "touch history.txt;git add history.txt;git commit -m 'Add history.txt';git log",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Run: touch history.txt, git add history.txt, git commit -m \"...\", git log"
  },
  "requireStagedChanges": true,
  "requiredCommandPatterns": [
    "^touch +history\\.txt($| +)",
    "^git +add +history\\.txt *$",
    "^git +commit +.*$",
    "^git +log *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Building a Commit History",
              "",
              "The GitHub repository has already been cloned for you, so you can focus on creating and reading commits.",
              "",
              "Every commit you create becomes part of the repository history.",
              "",
              "`git log` lets you read that history from newest commit to older commits. It shows details like the commit id, author, date, and commit message.",
              "",
              "The newest commit appears first in `git log`.",
              "",
              "The commit message helps explain what changed, and the commit id is how Git can refer to that exact snapshot later.",
              "",
              "In this exercise, you will create a new commit and then use `git log` to inspect it."
            ]
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
              "touch history.txt",
              "```",
              "",
              "**2. Stage it**",
              "```",
              "git add history.txt",
              "```",
              "",
              "**3. Commit it**",
              "```",
              "git commit -m \"Add history.txt\"",
              "```",
              "",
              "**4. Read the commit history**",
              "```",
              "git log",
              "```",
              "",
              "The level is complete once `main` points to the new commit and you have inspected it with `git log`.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
