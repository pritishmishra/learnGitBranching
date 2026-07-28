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
      "id": "C1"
    },
    "C2": {
      "parents": ["C0"],
      "id": "C2"
    },
    "C2'": {
      "parents": ["C1"],
      "id": "C2'"
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
        "id": "C1"
      },
      "C2'": {
        "parents": ["C1"],
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
  "name": {
    "en_US": "Replay Your Work on the Latest Main"
  },
  "goalTreeString": goalTree,
  "solutionCommand": "git fakeTeamwork 1;touch replay.txt;git add replay.txt;git commit -m 'Update replay.txt';git fetch;git rebase o/main;git push",
  "startTree": startTree,
  "hint": {
    "en_US": "Make a local commit, fetch the teammate commit, rebase on o/main, then push"
  },
  "requireStagedChanges": true,
  "requireCleanWorkingTreeForCompletion": true,
  "requiredCommandPatterns": [
    "^git +fakeTeamwork +1 *$",
    "^touch +\\S+ *$",
    "^git +add +\\S+ *$",
    "^git +commit +.*$",
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
              "## Replay Your Work on the Latest Main",
              "",
              "You have already learned that `git pull` fetches remote work and merges it into your local branch.",
              "",
              "`git rebase` is another way to combine work. Instead of making a merge commit, rebase takes your local commits and replays them on top of a new base.",
              "",
              "In this lesson, that new base will be the latest downloaded `main`, shown as `o/main`."
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
              "Rebase is useful when your local commit has not been pushed yet and you want a cleaner, straight-line history.",
              "",
              "Use it carefully: rebasing creates new copies of your commits. It is best for commits that are still local and have not been pushed.",
              "",
              "If your commit has already been pushed and other people may have based work on it, prefer merging unless your team has agreed on a rebase workflow."
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
              "You will simulate a teammate pushing one commit, make your own local commit, fetch the latest remote work, replay your work on top of `o/main`, and then push.",
              "",
              "**1. Simulate a teammate pushing work**",
              "",
              "```",
              "git fakeTeamwork 1",
              "```",
              "",
              "**2. Create, stage, and commit your own local file**",
              "",
              "```",
              "touch replay.txt;",
              "git add replay.txt;",
              "git commit -m \"Update replay.txt\"",
              "```",
              "",
              "**3. Download the teammate's latest commit**",
              "",
              "```",
              "git fetch",
              "```",
              "",
              "**4. Replay your local commit on top of the latest main**",
              "",
              "```",
              "git rebase o/main",
              "```",
              "",
              "**5. Push the updated history**",
              "",
              "```",
              "git push",
              "```",
              "",
              "The level is complete once the remote repository has the teammate's commit followed by your replayed commit.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
