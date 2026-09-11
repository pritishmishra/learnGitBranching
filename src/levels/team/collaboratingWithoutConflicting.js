var startTree = JSON.stringify({
  "branches": {
    "main": {
      "target": "C1",
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
      "rootCommit": true,
      "fileChanges": {
        "shared.txt": {
          "type": "added",
          "content": "Project plan"
        }
      }
    },
    "C1": {
      "parents": ["C0"],
      "id": "C1",
      "fileChanges": {
        "shared.txt": {
          "type": "modified",
          "content": "Project plan\nMy local update"
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
        "target": "C0",
        "id": "main",
        "remoteTrackingBranchID": null
      }
    },
    "commits": {
      "C0": {
        "parents": [],
        "id": "C0",
        "rootCommit": true,
        "fileChanges": {
          "shared.txt": {
            "type": "added",
            "content": "Project plan"
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
      "target": "C3",
      "id": "main",
      "remoteTrackingBranchID": "o/main"
    },
    "o/main": {
      "target": "C3",
      "id": "o/main",
      "remoteTrackingBranchID": null,
      "localBranchesThatTrackThis": ["main"]
    }
  },
  "commits": {
    "C0": {
      "parents": [],
      "id": "C0",
      "rootCommit": true,
      "fileChanges": {
        "shared.txt": {
          "type": "added",
          "content": "Project plan"
        }
      }
    },
    "C1": {
      "parents": ["C0"],
      "id": "C1",
      "fileChanges": {
        "shared.txt": {
          "type": "modified",
          "content": "Project plan\nMy local update"
        }
      }
    },
    "C2": {
      "parents": ["C0"],
      "id": "C2",
      "fileChanges": {
        "shared.txt": {
          "type": "modified",
          "content": "Project plan\nTeammate update"
        }
      }
    },
    "C3": {
      "parents": ["C1", "C2"],
      "id": "C3",
      "fileChanges": {
        "shared.txt": {
          "type": "modified",
          "content": "Project plan\nMy local update"
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
        "target": "C3",
        "id": "main",
        "remoteTrackingBranchID": null
      }
    },
    "commits": {
      "C0": {
        "parents": [],
        "id": "C0",
        "rootCommit": true,
        "fileChanges": {
          "shared.txt": {
            "type": "added",
            "content": "Project plan"
          }
        }
      },
      "C1": {
        "parents": ["C0"],
        "id": "C1",
        "fileChanges": {
          "shared.txt": {
            "type": "modified",
            "content": "Project plan\nMy local update"
          }
        }
      },
      "C2": {
        "parents": ["C0"],
        "id": "C2",
        "fileChanges": {
          "shared.txt": {
            "type": "modified",
            "content": "Project plan\nTeammate update"
          }
        }
      },
      "C3": {
        "parents": ["C1", "C2"],
        "id": "C3",
        "fileChanges": {
          "shared.txt": {
            "type": "modified",
            "content": "Project plan\nMy local update"
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
    "en_US": "Collaborating Without Conflicting"
  },
  "goalTreeString": goalTree,
  "solutionCommand": "git fakeTeamwork shared.txt;git pull;git diff;git resolve-conflict shared.txt;git diff;git add shared.txt;git commit -m 'Resolve shared.txt conflict';git push",
  "startTree": startTree,
  "hint": {
    "en_US": "Simulate teammate work on shared.txt, pull, resolve the conflict, commit the merge, then push"
  },
  "requireStagedChanges": true,
  "requireCleanWorkingTreeForCompletion": true,
  "mockConflictOnPull": {
    "filepath": "shared.txt"
  },
  "requiredCommandPatterns": [
    "^git +fakeTeamwork +shared\\.txt *$",
    "^git +pull *$",
    "^git +resolve-conflict +shared\\.txt *$",
    "^git +add +shared\\.txt *$",
    "^git +commit +.*$",
    "^git +push *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Collaborating Without Conflicting",
              "",
              "When you work with teammates, another person may push a new version of a file after your last pull.",
              "",
              "If you also change that same file locally, both versions need to be brought together.",
              "",
              "When you later run `git pull`, Git fetches the teammate's commit and then tries to merge it into your branch.",
              "",
              "Sometimes Git can combine the changes automatically. A conflict happens when Git cannot safely decide how to combine them."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "A conflict does not mean someone did something wrong.",
              "",
              "It means Git needs a person to decide what the final file should contain.",
              "",
              "In a real team, this is the moment to talk to your teammate, understand why they changed the file, and decide together how the final version should look, rather than accepting one version or the other without discussion."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "In a real repository, there is no command named `git resolve-conflict`.",
              "",
              "Resolving a conflict means opening the conflicted file in an editor, removing the conflict markers, and keeping the correct combined version.",
              "",
              "This app does not include a full text editor, so this lesson uses a teaching command to stand in for that edit:",
              "",
              "```",
              "git resolve-conflict shared.txt",
              "```",
              "",
              "That command is only part of this simulator. In this lesson it keeps your local change and discards the remote change. In real Git, after editing the file yourself, you would still run `git add shared.txt` and then `git commit` to finish the merge."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "`shared.txt` already exists. Your local copy has a committed line that is not on the remote yet.",
              "",
              "**1. Simulate a teammate changing the same file on the remote**",
              "",
              "```",
              "git fakeTeamwork shared.txt",
              "```",
              "",
              "**2. Pull the teammate's change**",
              "",
              "```",
              "git pull",
              "```",
              "",
              "Git should report a conflict in `shared.txt`. Run `git diff` if you want to inspect the conflict markers before resolving it.",
              "",
              "**3. Resolve the conflict after comparing both versions**",
              "",
              "In real Git, this step means talking to your teammate, editing the file manually, and deciding what the final file should contain. In this simulator, use the teaching-only command below to represent that edit.",
              "",
              "```",
              "git resolve-conflict shared.txt",
              "```",
              "",
              "This teaching command keeps your local change and discards the remote change. Run `git diff` again if you want to see the resolved file change before staging it.",
              "",
              "**4. Stage and commit the resolved file**",
              "",
              "```",
              "git add shared.txt;",
              "git commit -m \"Resolve shared.txt conflict\"",
              "```",
              "",
              "**5. Push the resolved work**",
              "",
              "```",
              "git push",
              "```",
              "",
              "Optional inspection commands:",
              "",
              "```",
              "git diff",
              "```",
              "",
              "The level is complete once your merge commit is pushed to the remote repository.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
