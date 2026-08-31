var startTree = JSON.stringify({
  "branches": {
    "main": {
      "target": "C1",
      "id": "main",
      "remoteTrackingBranchID": "o/main"
    },
    "feature-notifications": {
      "target": "C2",
      "id": "feature-notifications",
      "remoteTrackingBranchID": null
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
      "id": "C2",
      "commitMessage": "Add notifications.txt",
      "fileChanges": {
        "notifications.txt": {
          "type": "added",
          "content": "Notifications feature"
        }
      }
    }
  },
  "HEAD": {
    "target": "feature-notifications",
    "id": "HEAD"
  },
  "originTree": {
    "branches": {
      "main": {
        "target": "C3",
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
      },
      "C3": {
        "parents": ["C1"],
        "id": "C3",
        "commitMessage": "Add api.txt",
        "fileChanges": {
          "api.txt": {
            "type": "added",
            "content": "API update"
          }
        }
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
      "target": "C1",
      "id": "main",
      "remoteTrackingBranchID": "o/main"
    },
    "feature-notifications": {
      "target": "C2'",
      "id": "feature-notifications",
      "remoteTrackingBranchID": "o/feature-notifications"
    },
    "o/main": {
      "target": "C3",
      "id": "o/main",
      "remoteTrackingBranchID": null,
      "localBranchesThatTrackThis": ["main"]
    },
    "o/feature-notifications": {
      "target": "C2'",
      "id": "o/feature-notifications",
      "remoteTrackingBranchID": null,
      "localBranchesThatTrackThis": ["feature-notifications"]
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
    "C2'": {
      "parents": ["C3"],
      "id": "C2'"
    }
  },
  "HEAD": {
    "target": "feature-notifications",
    "id": "HEAD"
  },
  "originTree": {
    "branches": {
      "main": {
        "target": "C3",
        "id": "main",
        "remoteTrackingBranchID": null
      },
      "feature-notifications": {
        "target": "C2'",
        "id": "feature-notifications",
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
      },
      "C3": {
        "parents": ["C1"],
        "id": "C3"
      },
      "C2'": {
        "parents": ["C3"],
        "id": "C2'"
      }
    },
    "HEAD": {
      "target": "main",
      "id": "HEAD"
    }
  }
});

exports.level = {
  "exerciseNumber": 6,
  "name": {
    "en_US": "Catch Up Without a Merge"
  },
  "goalTreeString": goalTree,
  "solutionCommand": "git fetch;git rebase o/main;git push -u origin feature-notifications",
  "startTree": startTree,
  "initialGitConfig": {
    "user.name": "Student",
    "user.email": "student@example.com"
  },
  "expectedHeadFileChanges": {
    "notifications.txt": {
      "type": "added"
    }
  },
  "expectedWorkingDirectoryChanges": {},
  "expectedStagedChanges": {},
  "hint": {
    "en_US": "Fetch the latest changes, replay your feature branch on the latest downloaded main, then publish it with upstream tracking"
  },
  "requireCleanWorkingTreeForCompletion": true,
  "requiredCommandPatterns": [
    "^git +fetch( +origin)? *$",
    "^git +rebase +o/main *$",
    "^git +push +(-u|--set-upstream) +origin +feature-notifications *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Exercise 6: Catch Up Without a Merge",
              "",
              "### Scenario",
              "",
              "You are working on a feature branch when `main` moves ahead on the remote.",
              "",
              "Download the updated `main`, replay your feature work after the teammate's commit, and publish your feature branch without creating a merge commit.",
              "",
              "In this exercise, the feature branch is `feature-notifications`, your feature file is `notifications.txt`, and the teammate's file is `api.txt`.",
              "",
              "### Relevant lessons",
              "",
              "- Branching & Merging: Work on a Separate Timeline",
              "- Branching & Merging: Publishing a branch",
              "- Working with a Team: Download without Changing",
              "- Working with a Team: Replay Your Work on the Latest Main"
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
              "You are on `feature-notifications`, which contains commit `C2`.",
              "",
              "`C2` added `notifications.txt`.",
              "",
              "A teammate has pushed commit `C3` to `origin/main`, adding `api.txt`, but your repository has not downloaded `C3` yet.",
              "",
              "Your local view of `origin/main` still points at `C1`.",
              "",
              "### Your objectives",
              "",
              "1. Fetch the latest changes from `origin` without merging them into your current branch.",
              "2. Rebase `feature-notifications` so it is based on the latest downloaded `main` from `origin`.",
              "3. Do not create a merge commit.",
              "4. Push `feature-notifications` to `origin` and configure it to track `origin/feature-notifications`.",
              "5. Finish on `feature-notifications` with both `api.txt` and `notifications.txt` present in history.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
