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
              "You are cleaning up a repository before making a commit. The working directory already has a few changes, but they need correction.",
              "",
              "One tracked file was deleted by mistake and needs to be restored. Another new file was staged too early, but it should stay in your working directory for later.",
              "",
              "Your job is to recover the deleted file, unstage the early file without deleting it, then create and commit only the intended submission file.",
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
              "### Your objectives",
              "",
              "1. Restore the deleted file `settings.txt`.",
              "2. Remove `notes.txt` from the staging area while keeping the file in the working directory.",
              "3. Create `submission.txt` and commit this change.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
