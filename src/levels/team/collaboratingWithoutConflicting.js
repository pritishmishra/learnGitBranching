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
	          "content": "Project Plan"
        }
      }
    },
    "C1": {
      "parents": ["C0"],
      "id": "C1",
      "fileChanges": {
	        "shared.txt": {
	          "type": "modified",
	          "content": "My local update"
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
	            "content": "Project Plan"
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
	          "content": "Project Plan"
        }
      }
    },
    "C1": {
      "parents": ["C0"],
      "id": "C1",
      "fileChanges": {
	        "shared.txt": {
	          "type": "modified",
	          "content": "My local update"
	        }
	      }
	    },
    "C2": {
      "parents": ["C0"],
      "id": "C2",
      "fileChanges": {
	        "shared.txt": {
	          "type": "modified",
	          "content": "Teammate update"
	        }
	      }
	    },
    "C3": {
      "parents": ["C1", "C2"],
      "id": "C3",
      "fileChanges": {
	        "shared.txt": {
	          "type": "modified",
	          "content": "My local update"
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
	            "content": "Project Plan"
          }
        }
      },
      "C1": {
        "parents": ["C0"],
        "id": "C1",
        "fileChanges": {
	          "shared.txt": {
	            "type": "modified",
	            "content": "My local update"
	          }
	        }
	      },
      "C2": {
        "parents": ["C0"],
        "id": "C2",
        "fileChanges": {
	          "shared.txt": {
	            "type": "modified",
	            "content": "Teammate update"
	          }
	        }
	      },
      "C3": {
        "parents": ["C1", "C2"],
        "id": "C3",
        "fileChanges": {
	          "shared.txt": {
	            "type": "modified",
	            "content": "My local update"
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
              "## Reading the Conflict Diff",
              "",
              "After `git pull` reports a conflict, `git diff` shows how the conflicted working file differs from the last committed version.",
              "",
              "You may see output like this:",
              "",
              "```",
              "--- a/shared.txt",
              "```",
              "```",
              "+++ b/shared.txt",
              "```",
              "```",
              "@@ -1 +1 @@",
              "```",
              "```",
              "- Project Plan",
              "```",
              "```",
              "+ <<<<<<< HEAD",
              "```",
              "```",
              "+ My local update",
              "```",
              "```",
              "+ =======",
              "```",
              "```",
              "+ Teammate update",
              "```",
              "```",
              "+ >>>>>>> o/main",
              "```",
              "",
              "For this lesson, the three versions of `shared.txt` are:",
              "",
              "```",
              "base: Project Plan",
              "local commit added: My local update",
              "remote commit added: Teammate update",
              "```",
              "",
              "`--- a/shared.txt` is the old committed version, and `+++ b/shared.txt` is your current working copy.",
              "",
              "`@@ -1 +1 @@` is the location of the change. Here, Git is showing a change around line 1.",
              "",
              "Lines beginning with `-` are from the old version. Lines beginning with `+` are in the working copy now.",
              "",
              "`<<<<<<< HEAD` starts your local version, `=======` separates the two versions, and `>>>>>>> o/main` ends the teammate version from the remote-tracking branch."
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
              "That command is only part of this simulator. It keeps your local change and discards the remote change. After resolving the file, you would need to add and commit to finish the merge."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "You start with a local commit where `shared.txt` contains `My local update`.",
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
              "Git should report a conflict in `shared.txt`. Run `git diff` to see the conflict markers before resolving it.",
              "",
              "**3. Resolve the conflict**",
              "",
              "```",
              "git resolve-conflict shared.txt",
              "```",
              "",
              "This command keeps your local change and discards the remote change. Run `git diff` again to see the resolved file content.",
              "",
              "**4. Stage, commit, and push the resolved file**",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
