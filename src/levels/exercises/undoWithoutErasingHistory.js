var startTree = JSON.stringify({
  "branches": {
    "main": {
      "target": "C2",
      "id": "main",
      "remoteTrackingBranchID": "o/main"
    },
    "o/main": {
      "target": "C2",
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
      "id": "C1",
      "commitMessage": "Add experimental.txt",
      "fileChanges": {
        "experimental.txt": {
          "type": "added",
          "content": "Experimental change"
        }
      }
    },
    "C2": {
      "parents": ["C1"],
      "id": "C2",
      "commitMessage": "Add release-notes.txt",
      "fileChanges": {
        "release-notes.txt": {
          "type": "added",
          "content": "Release notes"
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
        "target": "C2",
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
        "id": "C1",
        "commitMessage": "Add experimental.txt",
        "fileChanges": {
          "experimental.txt": {
            "type": "added",
            "content": "Experimental change"
          }
        }
      },
      "C2": {
        "parents": ["C1"],
        "id": "C2",
        "commitMessage": "Add release-notes.txt",
        "fileChanges": {
          "release-notes.txt": {
            "type": "added",
            "content": "Release notes"
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
      "target": "C1'",
      "id": "main",
      "remoteTrackingBranchID": "o/main"
    },
    "o/main": {
      "target": "C1'",
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
    "C1'": {
      "parents": ["C2"],
      "id": "C1'"
    }
  },
  "HEAD": {
    "target": "main",
    "id": "HEAD"
  },
  "originTree": {
    "branches": {
      "main": {
        "target": "C1'",
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
      "C2": {
        "parents": ["C1"],
        "id": "C2"
      },
      "C1'": {
        "parents": ["C2"],
        "id": "C1'"
      }
    },
    "HEAD": {
      "target": "main",
      "id": "HEAD"
    }
  }
});

exports.level = {
  "exerciseNumber": 5,
  "name": {
    "en_US": "Undo Without Erasing History"
  },
  "goalTreeString": goalTree,
  "solutionCommand": "git log;git revert HEAD~1;git push",
  "startTree": startTree,
  "initialGitConfig": {
    "user.name": "Student",
    "user.email": "student@example.com"
  },
  "expectedHeadFileChanges": {
    "experimental.txt": {
      "type": "deleted"
    }
  },
  "expectedWorkingDirectoryChanges": {},
  "expectedStagedChanges": {},
  "hint": {
    "en_US": "Use git log, git revert HEAD~1, then push the new revert commit"
  },
  "requireCleanWorkingTreeForCompletion": true,
  "requiredCommandPatterns": [
    "^git +log *$",
    "^git +revert +(HEAD~1|C1) *$",
    "^git +push( +origin +main)? *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Exercise 5: Undo Without Erasing History",
              "",
              "### Scenario",
              "",
              "A change that was already pushed needs to be undone.",
              "",
              "Undo the unwanted change without deleting any existing commits or affecting the work committed afterward.",
              "",
              "Then push the correction."
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
              "`origin/main` exists.",
              "",
              "The history has two pushed commits: one commit adds `experimental.txt`, and the next commit adds `release-notes.txt`.",
              "",
              "You must remove `experimental.txt` while keeping `release-notes.txt`.",
              "",
              "### Setup already completed",
              "",
              "- Repository-local Git identity is already configured.",
              "",
              "1. You start on `main`.",
              "2. `touch experimental.txt`",
              "3. `git add experimental.txt`",
              "4. `git commit -m \"<setup message>\"` created commit `C1`.",
              "5. `touch release-notes.txt`",
              "6. `git add release-notes.txt`",
              "7. `git commit -m \"<setup message>\"` created commit `C2`.",
              "8. `git push origin main`",
              "9. Both commits have already been pushed.",
              "",
              "### Your objectives",
              "",
              "1. View the commit history and confirm that the second-most-recent commit added `experimental.txt`.",
              "2. Revert the second-most-recent commit. Hint: use `HEAD~1`.",
              "   - This should create a new commit without removing any existing commits.",
              "3. Make sure `experimental.txt` is removed and `release-notes.txt` remains.",
              "4. Push the new commit to `origin/main`.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
