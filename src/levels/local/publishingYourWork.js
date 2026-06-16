exports.level = {
  "name": {
    "en_US": "Publishing your work"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git clone;touch publish.txt;git add publish.txt;git commit -m 'Add publish.txt';git push",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}",
  "hint": {
    "en_US": "Run: git clone, touch publish.txt, git add publish.txt, git commit -m \"...\", git push"
  },
  "requireStagedChanges": true,
  "requiredCommandPatterns": [
    "^git +clone *$",
    "^touch +publish\\.txt($| +)",
    "^git +add +publish\\.txt *$",
    "^git +commit +.*$",
    "^git +push *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Publishing your work",
              "",
              "A commit starts as local work. It exists in your repository, but the remote repository does not receive it until you publish it.",
              "",
              "`git push` sends your local commits to the remote. After a successful push, the remote branch is updated to point at the same commit."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "In this exercise, you will start by cloning so the visualization shows both copies of the project.",
              "",
              "Then you will create a file, stage it, commit it locally, and push that commit to the remote.",
              "",
              "Watch the left side and right side of the visualization. The left side is your local repository; the right side is the remote repository."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Push a Local Commit",
              "",
              "First clone the repository so a remote exists:",
              "",
              "```",
              "git clone",
              "```",
              "",
              "Then create the local commit:",
              "",
              "```",
              "touch publish.txt",
              "git add publish.txt",
              "git commit -m \"Add publish.txt\"",
              "```",
              "",
              "Finally, publish that commit:",
              "",
              "```",
              "git push",
              "```"
            ],
            "afterMarkdowns": [
              "After `git push`, the remote repository has the new commit too.",
              "",
              "The local branch `main`, the remote-tracking branch `o/main`, and the remote branch `main` now all point to the same snapshot.",
              "",
              "Now run the full workflow yourself."
            ],
            "command": "git push",
            "beforeCommand": "git clone;touch publish.txt;git add publish.txt;git commit -m 'Add publish.txt'"
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
              "**1. Clone the repository**",
              "```",
              "git clone",
              "```",
              "",
              "**2. Create a file**",
              "```",
              "touch publish.txt",
              "```",
              "",
              "**3. Stage it**",
              "```",
              "git add publish.txt",
              "```",
              "",
              "**4. Commit it locally**",
              "```",
              "git commit -m \"Add publish.txt\"",
              "```",
              "",
              "**5. Publish it to the remote**",
              "```",
              "git push",
              "```",
              "",
              "The level is complete once the local and remote repositories both point to the new commit."
            ]
          }
        }
      ]
    }
  }
};
