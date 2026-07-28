var startTree = JSON.stringify({
  "branches": {
    "main": {
      "target": "C0",
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
        "rootCommit": true
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
      "rootCommit": true
    },
    "C1": {
      "parents": ["C0"],
      "id": "C1"
    },
    "C2": {
      "parents": ["C0"],
      "id": "C2"
    },
    "C3": {
      "parents": ["C2", "C1"],
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
      "C2": {
        "parents": ["C0"],
        "id": "C2"
      },
      "C3": {
        "parents": ["C2", "C1"],
        "id": "C3"
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
  "solutionCommand": "git fakeTeamwork 1;touch shared.txt;git add shared.txt;git commit -m 'Update shared.txt';git pull;git resolve-conflict shared.txt;git add shared.txt;git commit -m 'Resolve shared.txt conflict';git push",
  "startTree": startTree,
  "hint": {
    "en_US": "Simulate teammate work, commit your own change to shared.txt, pull, resolve the conflict, commit the merge, then push"
  },
  "requireStagedChanges": true,
  "requireCleanWorkingTreeForCompletion": true,
  "mockConflictOnPull": {
    "filepath": "shared.txt"
  },
  "requiredCommandPatterns": [
    "^git +fakeTeamwork +1 *$",
    "^touch +shared\\.txt *$",
    "^git +add +shared\\.txt *$",
    "^git +commit +.*$",
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
              "In a real team, this is the moment to talk to your teammate, understand why they changed the file, and combine the two ideas without overwriting or rejecting either version blindly."
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
              "That command is only part of this simulator. In real Git, after editing the file yourself, you would still run `git add shared.txt` and then `git commit` to finish the merge."
            ]
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
              "You will simulate a teammate changing `shared.txt`, make your own local change to the same file, pull the teammate's work, resolve the conflict, and push the final merge.",
              "",
              "**1. Simulate a teammate pushing work**",
              "",
              "```",
              "git fakeTeamwork 1",
              "```",
              "",
              "**2. Make and commit your own local change**",
              "",
              "```",
              "touch shared.txt;",
              "git add shared.txt;",
              "git commit -m \"Update shared.txt\"",
              "```",
              "",
              "**3. Pull the teammate's change**",
              "",
              "```",
              "git pull",
              "```",
              "",
              "**4. Resolve the conflict after comparing both versions**",
              "",
              "In real Git, this step means editing the file manually. In this simulator, use the teaching-only command below to represent that edit.",
              "",
              "```",
              "git resolve-conflict shared.txt",
              "```",
              "",
              "**5. Stage and commit the resolved file**",
              "",
              "```",
              "git add shared.txt;",
              "git commit -m \"Resolve shared.txt conflict\"",
              "```",
              "",
              "**6. Push the resolved work**",
              "",
              "```",
              "git push",
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
