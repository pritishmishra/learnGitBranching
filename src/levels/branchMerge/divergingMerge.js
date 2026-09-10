exports.level = {
  "name": {
    "en_US": "Merging With Diverging"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C4\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"feature\":{\"target\":\"C2\",\"id\":\"feature\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C3\",\"C2\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "touch feature.txt;git add feature.txt;git commit -m 'Add feature.txt';git checkout main;touch main.txt;git add main.txt;git commit -m 'Update main';git merge feature",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"feature\":{\"target\":\"C1\",\"id\":\"feature\"},\"o/main\":{\"target\":\"C1\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"feature\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Create work on feature, create separate work on main, then merge feature into main"
  },
  "requireStagedChanges": true,
  "requiredCommandPatterns": [
    "^touch +feature\\.txt($| +)",
    "^git +add +feature\\.txt *$",
    "^git +commit +.*$",
    "^git +checkout +main *$",
    "^touch +main\\.txt($| +)",
    "^git +add +main\\.txt *$",
    "^git +commit +.*$",
    "^git +merge +feature *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Merging With Diverging",
              "",
              "A fast-forward merge works when `main` has not moved since the feature branch started.",
              "",
              "Now you will try the other common case: both branches have new commits. Git needs to create a merge commit to bring those timelines back together."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Here `feature` and `main` each have their own new commit.",
              "",
              "`git merge feature` creates a new commit on `main` with two parents."
            ],
            "afterMarkdowns": [
              "`main` now points to a merge commit.",
              "",
              "One parent follows the work that was already on `main`; the other parent follows the work from `feature`."
            ],
            "command": "git merge feature",
            "beforeCommand": "git checkout -b feature;touch feature.txt;git add feature.txt;git commit -m 'Add feature.txt';git checkout main;touch main.txt;git add main.txt;git commit -m 'Update main'"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "You start on the `feature` branch.",
              "",
              "**1. Create `feature.txt` and commit it on the new branch**",
              "",
              "**2. Return to `main`**",
              "",
              "```",
              "git checkout main",
              "```",
              "",
              "**3. Create `main.txt` and commit it on `main`**",
              "",
              "**4. Merge the feature branch into `main`**",
              "",
              "```",
              "git merge feature",
              "```",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
