var startTree = JSON.stringify({
  "branches": {
    "main": {
      "target": "C2",
      "id": "main",
      "remoteTrackingBranchID": "o/main"
    },
    "o/main": {
      "target": "C0",
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
    "C2": {
      "parents": ["C0"],
      "id": "C2",
      "fileChanges": {
        "replay.txt": {
          "type": "added",
          "content": ""
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
        "id": "C1",
        "fileChanges": {
          "teammate.txt": {
            "type": "added",
            "content": ""
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
      "target": "C2'",
      "id": "main",
      "remoteTrackingBranchID": "o/main"
    },
    "o/main": {
      "target": "C2'",
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
      "fileChanges": {
        "teammate.txt": {
          "type": "added",
          "content": ""
        }
      }
    },
    "C2": {
      "parents": ["C0"],
      "id": "C2",
      "fileChanges": {
        "replay.txt": {
          "type": "added",
          "content": ""
        }
      }
    },
    "C2'": {
      "parents": ["C1"],
      "id": "C2'",
      "fileChanges": {
        "replay.txt": {
          "type": "added",
          "content": ""
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
        "target": "C2'",
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
        "fileChanges": {
          "teammate.txt": {
            "type": "added",
            "content": ""
          }
        }
      },
      "C2'": {
        "parents": ["C1"],
        "id": "C2'",
        "fileChanges": {
          "replay.txt": {
            "type": "added",
            "content": ""
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

exports.level = {
  "name": {
    "en_US": "Replay Your Work On The Latest Main"
  },
  "goalTreeString": goalTree,
  "solutionCommand": "git fetch;git rebase o/main;git push",
  "startTree": startTree,
  "hint": {
    "en_US": "Fetch the teammate commit, rebase on o/main, then push"
  },
  "requireCleanWorkingTreeForCompletion": true,
  "requiredCommandPatterns": [
    "^git +fetch *$",
    "^git +rebase +o/main *$",
    "^git +push *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Replay Your Work On The Latest Main",
              "",
              "You have already learned that `git pull` fetches remote work and merges it into your local branch.",
              "",
              "`git rebase` is another way to combine work. Instead of making a merge commit, rebase takes your local commits and replays them on top of a new base.",
              "",
              "Conflicts can happen during a rebase too. If your commit and the newer remote commit changed the same part of a file, Git may stop and ask you to resolve the conflict before the rebase can continue.",
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Here, your teammate has already pushed one commit to the remote `main`, and you have one local commit that is still based on the older `main`.",
              "",
              "After `git fetch`, `o/main` points to the teammate's latest work. Watch `git rebase o/main` replay your local commit on top of it."
            ],
            "afterMarkdowns": [
              "Your local commit was copied onto the latest `o/main`, creating a new commit id.",
              "",
              "The history is now linear: teammate work first, then your replayed work."
            ],
            "command": "git rebase o/main",
            "beforeCommand": "git clone;git config user.name Student;git config user.email student@example.com;git fakeTeamwork 1;touch replay.txt;git add replay.txt;git commit -m 'Update replay.txt';git fetch"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Rebase is useful when you want a cleaner, straight-line history.",
              "",
              "The important caution is that rebase rewrites commit history. In the demo, your original local commit is copied to a new commit id after the teammate's commit.",
              "",
              "That is usually fine for commits that only exist on your machine. It becomes risky if those commits have already been pushed and another person has based work on them, because their history still points to the old commit ids.",
              "",
              "For pushed commits that teammates may already have, prefer merging unless your team has explicitly agreed to rewrite that history."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "You start with one local commit on `main`. A teammate has already pushed one newer commit to remote `main`, but your local repository has not downloaded it yet.",
              "",
              "**1. Download the teammate's latest commit**",
              "",
              "```",
              "git fetch",
              "```",
              "",
              "**2. Replay your local commit on top of the latest main**",
              "",
              "```",
              "git rebase o/main",
              "```",
              "",
              "**3. Push the updated history**",
              "",
              "```",
              "git push",
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
