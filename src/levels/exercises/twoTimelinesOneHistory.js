var startTree = JSON.stringify({
  "branches": {
    "main": {
      "target": "C1",
      "id": "main",
      "remoteTrackingBranchID": "o/main"
    },
    "o/main": {
      "target": "C1",
      "id": "o/main",
      "remoteTrackingBranchID": null,
      "localBranchesThatTrackThis": ["main"]
    }
  },
  "commits": {
    "C0": {
      "parents": [],
      "id": "C0",
      "rootCommit": true
    },
    "C1": {
      "parents": ["C0"],
      "id": "C1"
    }
  },
  "HEAD": {
    "target": "main",
    "id": "HEAD"
  },
  "originTree": {
    "branches": {
      "main": {
        "target": "C1",
        "id": "main",
        "remoteTrackingBranchID": null
      }
    },
    "commits": {
      "C0": {
        "parents": [],
        "id": "C0",
        "rootCommit": true
      },
      "C1": {
        "parents": ["C0"],
        "id": "C1"
      }
    },
    "HEAD": {
      "target": "main",
      "id": "HEAD"
    }
  }
});

var goalTree = JSON.stringify({
  "branches": {
    "main": {
      "target": "C4",
      "id": "main",
      "remoteTrackingBranchID": "o/main"
    },
    "feature-profile": {
      "target": "C2",
      "id": "feature-profile"
    },
    "o/main": {
      "target": "C1",
      "id": "o/main",
      "remoteTrackingBranchID": null,
      "localBranchesThatTrackThis": ["main"]
    }
  },
  "commits": {
    "C0": {
      "parents": [],
      "id": "C0",
      "rootCommit": true
    },
    "C1": {
      "parents": ["C0"],
      "id": "C1"
    },
    "C2": {
      "parents": ["C1"],
      "id": "C2"
    },
    "C3": {
      "parents": ["C1"],
      "id": "C3"
    },
    "C4": {
      "parents": ["C3", "C2"],
      "id": "C4"
    }
  },
  "HEAD": {
    "target": "main",
    "id": "HEAD"
  },
  "originTree": {
    "branches": {
      "main": {
        "target": "C1",
        "id": "main",
        "remoteTrackingBranchID": null
      }
    },
    "commits": {
      "C0": {
        "parents": [],
        "id": "C0",
        "rootCommit": true
      },
      "C1": {
        "parents": ["C0"],
        "id": "C1"
      }
    },
    "HEAD": {
      "target": "main",
      "id": "HEAD"
    }
  }
});

exports.level = {
  "exerciseNumber": 2,
  "name": {
    "en_US": "Two Timelines, One History"
  },
  "goalTreeString": goalTree,
  "solutionCommand": "git checkout -b feature-profile;touch profile.txt;git add profile.txt;git commit -m 'Add profile';git checkout main;touch hotfix.txt;git add hotfix.txt;git commit -m 'Add hotfix';git merge feature-profile",
  "startTree": startTree,
  "hint": {
    "en_US": "Create feature-profile work, create a separate hotfix on main, then merge feature-profile into main"
  },
  "requireStagedChanges": true,
  "requireCleanWorkingTreeForCompletion": true,
  "requiredCommandPatterns": [
    "^git +checkout +-b +feature-profile *$",
    "^touch +profile\\.txt *$",
    "^git +add +profile\\.txt *$",
    "^git +commit +.*-m +(?!['\"]{2})(['\"][^'\"]+['\"]|\\S.*)$",
    "^git +checkout +main *$",
    "^touch +hotfix\\.txt *$",
    "^git +add +hotfix\\.txt *$",
    "^git +commit +.*-m +(?!['\"]{2})(['\"][^'\"]+['\"]|\\S.*)$",
    "^git +merge +feature-profile *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Exercise 2: Two Timelines, One History",
              "",
              "### Scenario",
              "",
              "Develop a profile feature away from `main`, then create an independent hotfix on `main`.",
              "",
              "Bring the two diverging lines of work together when both are ready."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Details",
              "",
              "### Starting repository state",
              "",
              "You start on `main` in a clean repository containing one initial commit.",
              "",
              "No feature branch exists yet.",
              "",
              "### Setup already completed",
              "",
              "- Cloned the starter repository for you.",
              "- Added a file and committed the change.",
              "- Repository-local Git identity is already configured.",
              "",
              "### Your objectives",
              "",
              "1. Create a branch named `feature-profile` and switch to it.",
              "2. Create `profile.txt`, stage it, and commit it with any non-empty message.",
              "3. Return to `main`.",
              "4. Create `hotfix.txt`, stage it, and commit it with any non-empty message.",
              "5. Merge `feature-profile` into `main` so the final `main` history contains both lines of work.",
              "6. Finish the exercise on `main`.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
