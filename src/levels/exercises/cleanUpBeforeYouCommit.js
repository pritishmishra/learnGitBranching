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
      "id": "C2"
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
  "exerciseNumber": 3,
  "name": {
    "en_US": "Clean Up Before You Commit"
  },
  "goalTreeString": goalTree,
  "solutionCommand": "git restore settings.txt;git unstage notes.txt;touch submission.txt;git add submission.txt;git commit -m 'Add submission'",
  "startTree": startTree,
  "initialGitConfig": {
    "user.name": "Student",
    "user.email": "student@example.com"
  },
  "initialWorkingDirectoryChanges": {
    "settings.txt": {
      "type": "deleted"
    }
  },
  "initialStagedChanges": {
    "notes.txt": {
      "type": "added",
      "content": "Draft notes"
    }
  },
  "expectedHeadFileChanges": {
    "submission.txt": {
      "type": "added"
    }
  },
  "expectedWorkingDirectoryChanges": {
    "notes.txt": {
      "type": "added"
    }
  },
  "expectedStagedChanges": {},
  "hint": {
    "en_US": "Restore settings.txt, unstage notes.txt, then commit only submission.txt"
  },
  "requireStagedChanges": true,
  "requiredCommandPatterns": [
    "^git +restore +settings\\.txt *$",
    "^(git +unstage +notes\\.txt|git +restore +--staged +notes\\.txt) *$",
    "^touch +submission\\.txt *$",
    "^git +add +submission\\.txt *$",
    "^git +commit +.*-m +(?!['\"]{2})(['\"][^'\"]+['\"]|\\S.*)$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Exercise 3: Clean Up Before You Commit",
              "",
              "### Scenario",
              "",
              "Your working directory was left in a messy state.",
              "",
              "Recover a tracked file that was accidentally removed, take an unrelated new file out of the staging area without deleting it, and then commit only the intended submission file.",
              "",
              "### Relevant lessons",
              "",
              "- Basic Git Workflow: Your First Snapshot",
              "- Basic Git Workflow: What did I change?",
              "- Correcting Mistakes: Undo Local Changes"
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
              "`settings.txt` was previously committed, but it was accidentally deleted.",
              "",
              "`notes.txt` is a newly created file that has already been staged.",
              "",
              "There are no other uncommitted changes.",
              "",
              "### Setup already completed",
              "",
              "- Repository-local Git identity is already configured.",
              "",
              "1. `settings.txt` was committed earlier.",
              "2. `rm settings.txt`",
              "3. `touch notes.txt`",
              "4. `git add notes.txt`",
              "5. You start here with a dirty working tree and index.",
              "",
              "### Your objectives",
              "",
              "1. Use Git to bring back the deleted `settings.txt` file.",
              "2. Remove `notes.txt` from the staging area while keeping the file in the working directory.",
              "3. Create `submission.txt` using `touch`.",
              "4. Stage and commit only `submission.txt` using any non-empty commit message.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
