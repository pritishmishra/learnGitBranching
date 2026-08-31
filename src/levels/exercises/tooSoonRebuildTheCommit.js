var startTree = JSON.stringify({
  "branches": {
    "main": {
      "target": "C2",
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
    },
    "C2": {
      "parents": ["C1"],
      "id": "C2",
      "fileChanges": {
        "draft.txt": {
          "type": "added",
          "content": "Draft content"
        }
      }
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
      "target": "C3",
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
    },
    "C3": {
      "parents": ["C1"],
      "id": "C3"
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
  "exerciseNumber": 4,
  "name": {
    "en_US": "Too Soon - Rebuild the Commit"
  },
  "goalTreeString": goalTree,
  "solutionCommand": "git reset --soft HEAD~1;touch review.txt;git add review.txt;git commit -m 'Add draft and review'",
  "startTree": startTree,
  "initialGitConfig": {
    "user.name": "Student",
    "user.email": "student@example.com"
  },
  "expectedHeadFileChanges": {
    "draft.txt": {
      "type": "added"
    },
    "review.txt": {
      "type": "added"
    }
  },
  "expectedWorkingDirectoryChanges": {},
  "expectedStagedChanges": {},
  "hint": {
    "en_US": "Use git reset --soft HEAD~1, then add review.txt and commit both files together"
  },
  "requireStagedChanges": true,
  "requireCleanWorkingTreeForCompletion": true,
  "requiredCommandPatterns": [
    "^git +reset +--soft +HEAD~1 *$",
    "^touch +review\\.txt *$",
    "^git +add +review\\.txt *$",
    "^git +commit +.*-m +(?!['\"]{2})(['\"][^'\"]+['\"]|\\S.*)$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Exercise 4: Too Soon - Rebuild the Commit",
              "",
              "### Scenario",
              "",
              "Sometimes you commit one part of your work before the full change is ready.",
              "",
              "Undo that local commit, keep its file changes staged, add the missing follow-up file, and create one replacement commit that contains both files.",
              "",
              "In this exercise, the early file is `draft.txt` and the follow-up file is `review.txt`.",
              "",
              "### Relevant lessons",
              "",
              "- Basic Git Workflow: Your First Snapshot",
              "- Basic Git Workflow: Checking the commit history",
              "- Correcting Mistakes: Rewind Local History"
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
              "`main` contains one normal commit followed by one local, unpushed commit that introduced `draft.txt`.",
              "",
              "`draft.txt` has been created and the change has been committed.",
              "",
              "### Setup already completed",
              "",
              "- Repository-local Git identity is already configured.",
              "",
              "1. Commit `C1` is already on `origin/main`.",
              "2. `draft.txt` has been created and its change has been committed.",
              "3. `git add draft.txt`",
              "4. `git commit -m \"<setup message>\"` created local commit `C2`; it has not been pushed.",
              "5. `HEAD` is now `C2` on local `main`.",
              "",
              "### Your objectives",
              "",
              "1. Undo only the most recent local commit while keeping its changes staged.",
              "   - `draft.txt` should show as staged.",
              "2. Create `review.txt`. Commit both files `draft.txt` and `review.txt`.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
