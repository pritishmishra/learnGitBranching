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
    },
    "feature": {
      "target": "C3",
      "id": "feature"
    },
    "experiment": {
      "target": "C5",
      "id": "experiment"
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
      "parents": ["C2"],
      "id": "C3"
    },
    "C4": {
      "parents": ["C1"],
      "id": "C4"
    },
    "C5": {
      "parents": ["C4"],
      "id": "C5"
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
      "target": "C5'",
      "id": "main",
      "remoteTrackingBranchID": "o/main"
    },
    "o/main": {
      "target": "C1",
      "id": "o/main",
      "remoteTrackingBranchID": null,
      "localBranchesThatTrackThis": ["main"]
    },
    "feature": {
      "target": "C3",
      "id": "feature"
    },
    "experiment": {
      "target": "C5",
      "id": "experiment"
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
      "parents": ["C2"],
      "id": "C3"
    },
    "C4": {
      "parents": ["C1"],
      "id": "C4"
    },
    "C5": {
      "parents": ["C4"],
      "id": "C5"
    },
    "C3'": {
      "parents": ["C1"],
      "id": "C3'"
    },
    "C5'": {
      "parents": ["C3'"],
      "id": "C5'"
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
  "name": {
    "en_US": "Pick the Good Parts"
  },
  "goalTreeString": goalTree,
  "solutionCommand": "git cherry-pick C3 C5",
  "startTree": startTree,
  "hint": {
    "en_US": "Copy only commits C3 and C5 onto main with git cherry-pick"
  },
  "requiredCommandPatterns": [
    "^git +cherry-pick +C3 +C5 *$"
  ],
  "disabledMap": {
    "git rebase": true,
    "git merge": true
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Pick the Good Parts",
              "",
              "Sometimes a branch contains several commits, but you only want one specific change from it.",
              "",
              "A merge brings an entire branch history together. A rebase replays a range of work.",
              "",
              "`git cherry-pick` is more selective: it copies specific commits onto your current branch."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "The command form is:",
              "",
              "```",
              "git cherry-pick <commit> <another-commit>",
              "```",
              "",
              "Cherry-pick does not move the original branch. It creates new commits on your current branch with the same changes as the commits you selected.",
              "",
              "Because these are copies, the new commits get new commit ids."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Watch `git cherry-pick C3 C5` copy two selected commits onto `main`.",
              "",
              "The source branches stay where they are."
            ],
            "afterMarkdowns": [
              "`main` now has copies of the selected commits.",
              "",
              "The original commits still exist on their original branches."
            ],
            "command": "git cherry-pick C3 C5",
            "beforeCommand": "git clone;git commit;git branch feature;git checkout feature;git commit;git commit;git checkout main;git branch experiment;git checkout experiment;git commit;git commit;git checkout main"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "The GitHub repository has already been cloned for you.",
              "",
              "`main` is checked out. The `feature` branch contains commits `C2` and `C3`, and the `experiment` branch contains commits `C4` and `C5`.",
              "",
              "Copy only `C3` and `C5` onto `main`:",
              "",
              "```",
              "git cherry-pick C3 C5",
              "```",
              "",
              "The level is complete once `main` contains copied versions of `C3` and `C5` without merging the full source branches.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
