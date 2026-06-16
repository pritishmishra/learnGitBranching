exports.level = {
  "name": {
    "en_US": "What did I change?"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}",
  "solutionCommand": "touch notes.txt;git status;git diff;git add notes.txt;git status;git diff --staged",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}",
  "hint": {
    "en_US": "Run: touch notes.txt, git status, git diff, git add notes.txt, git status, git diff --staged"
  },
  "requireStagedChangesForCompletion": true,
  "requiredCommandPatterns": [
    "^touch +notes\\.txt($| +)",
    "^git +status *$",
    "^git +diff *$",
    "^git +add +notes\\.txt *$",
    "^git +status *$",
    "^git +diff +(--staged|--cached) *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## What did I change?",
              "",
              "Before you commit, Git gives you tools to inspect your work.",
              "",
              "`git status` tells you which files changed and whether those changes are staged.",
              "",
              "`git diff` shows the actual line-by-line changes in your working directory.",
              "",
              "`git diff --staged` shows the line-by-line changes that are already staged for the next commit."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "In this exercise, you will create a file, inspect the unstaged change, stage it, and then inspect the staged change.",
              "",
              "The commit graph will not change in this exercise because you are not creating a commit yet. You are learning how to check what Git sees before you save a snapshot."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Inspect Before and After Staging",
              "",
              "First create a file. Then use `git status` and `git diff` to see the unstaged change:",
              "",
              "```",
              "touch notes.txt",
              "git status",
              "git diff",
              "```",
              "",
              "After staging the file, `git diff --staged` shows what will go into the next commit:",
              "",
              "```",
              "git add notes.txt",
              "git status",
              "git diff --staged",
              "```"
            ],
            "afterMarkdowns": [
              "`git status` shows where the file is in the workflow.",
              "",
              "`git diff` is useful before staging. `git diff --staged` is useful after staging.",
              "",
              "Now try the same inspection flow yourself."
            ],
            "command": "git diff --staged",
            "beforeCommand": "touch notes.txt;git status;git diff;git add notes.txt;git status"
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
              "touch notes.txt",
              "```",
              "",
              "**2. Check the working directory**",
              "```",
              "git status",
              "```",
              "",
              "**3. Inspect the unstaged change**",
              "```",
              "git diff",
              "```",
              "",
              "**4. Stage the file**",
              "```",
              "git add notes.txt",
              "```",
              "",
              "**5. Check the staged state**",
              "```",
              "git status",
              "```",
              "",
              "**6. Inspect the staged change**",
              "```",
              "git diff --staged",
              "```",
              "",
              "The level is complete once `notes.txt` is staged and you have inspected the change.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
