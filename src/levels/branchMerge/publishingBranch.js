exports.level = {
  "name": {
    "en_US": "Publishing a branch"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"feature\":{\"target\":\"C2\",\"id\":\"feature\",\"remoteTrackingBranchID\":\"o/feature\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]},\"o/feature\":{\"target\":\"C2\",\"id\":\"o/feature\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"feature\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"HEAD\":{\"target\":\"feature\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":null},\"feature\":{\"target\":\"C2\",\"id\":\"feature\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git checkout -b feature;touch feature.txt;git add feature.txt;git commit -m 'Add feature.txt';git push -u origin feature",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Create and publish a new branch with git checkout -b feature, then git push -u origin feature"
  },
  "requireStagedChanges": true,
  "requiredCommandPatterns": [
    "^git +checkout +-b +feature *$",
    "^touch +feature\\.txt($| +)",
    "^git +add +feature\\.txt *$",
    "^git +commit +.*$",
    "^git +push +(-u|--set-upstream) +origin +feature *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Publishing a branch",
              "",
              "The GitHub repository has already been cloned for you.",
              "",
              "In the last exercise, you created a branch locally. A local branch is private to your copy until you publish it to the remote repository.",
              "",
              "In this exercise, you will create a new branch, make one commit on it, and publish that branch to `origin`."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "You can create a branch and switch to it in one command:",
              "",
              "```",
              "git checkout -b feature",
              "```",
              "",
              "After you commit on that branch, publish it with:",
              "",
              "```",
              "git push -u origin feature",
              "```",
              "",
              "`origin` is the remote repository. `feature` is the branch you want to publish."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "The `-u` flag sets the upstream relationship for your local branch.",
              "",
              "That means your local `feature` branch will track the remote branch `origin/feature` after the push.",
              "",
              "In this visualization, the local remote-tracking branch is shown as `o/feature` because the full `origin/feature` label is too long for the UI."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Push a Branch",
              "",
              "`git push <remote> <branch>` tells Git where the commits come from and where they should go.",
              "",
              "Here, `git push -u origin feature` takes commits from your local `feature` branch and updates the `feature` branch on `origin`."
            ],
            "afterMarkdowns": [
              "The remote now has a `feature` branch, and your local `feature` branch tracks `o/feature`.",
              "",
              "Now run the full workflow yourself."
            ],
            "command": "git push -u origin feature",
            "beforeCommand": "git checkout -b feature;touch feature.txt;git add feature.txt;git commit -m 'Add feature.txt'"
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
              "**1. Create and switch to a new branch**",
              "```",
              "git checkout -b feature",
              "```",
              "",
              "**2. Create a file**",
              "```",
              "touch feature.txt",
              "```",
              "",
              "**3. Stage it**",
              "```",
              "git add feature.txt",
              "```",
              "",
              "**4. Commit it on the branch**",
              "```",
              "git commit -m \"Add feature.txt\"",
              "```",
              "",
              "**5. Publish the branch and set upstream tracking**",
              "```",
              "git push -u origin feature",
              "```",
              "",
              "The level is complete once `feature` exists locally and on the remote, and both point to the new commit.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
