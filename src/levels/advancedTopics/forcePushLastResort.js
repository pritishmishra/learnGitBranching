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
    "C2": {
      "parents": ["C0"],
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
      "C2": {
        "parents": ["C0"],
        "id": "C2"
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
    "en_US": "The Emergency Override"
  },
  "goalTreeString": goalTree,
  "solutionCommand": "touch first.txt;git add first.txt;git commit -m 'Add first version';git push;git reset --hard HEAD~1;touch replacement.txt;git add replacement.txt;git commit -m 'Add replacement version';git push --force",
  "startTree": startTree,
  "hint": {
    "en_US": "Push a commit, reset back, make a replacement commit, then force-push the replacement"
  },
  "requireStagedChanges": true,
  "requireCleanWorkingTreeForCompletion": true,
  "requiredCommandPatterns": [
    "^touch +\\S+ *$",
    "^git +add +\\S+ *$",
    "^git +commit +.*$",
    "^git +push *$",
    "^git +reset +--hard +HEAD~1 *$",
    "^touch +\\S+ *$",
    "^git +add +\\S+ *$",
    "^git +commit +.*$",
    "^git +push +(--force|-f) *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## The Emergency Override",
              "",
              "A normal `git push` is intentionally conservative. It updates the remote branch only when the remote can fast-forward to your local branch.",
              "",
              "That rule protects teammates from losing commits that the remote already knows about.",
              "",
              "`git push --force` tells Git to move the remote branch to your local branch even when that is not a fast-forward."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Here is the risky situation this lesson will model:",
              "",
              "You push a commit to the remote.",
              "",
              "Then you decide that pushed commit should not be the public version, so you reset your local branch back with `git reset --hard HEAD~1`.",
              "",
              "After that, you make a replacement commit and try to push it."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "After a commit has been pushed, both reset modes can create trouble if you use them to rewrite public history.",
              "",
              "`git reset --soft HEAD~1` moves your local branch back but keeps the old commit's file changes staged.",
              "",
              "`git reset --hard HEAD~1` moves your local branch back and discards the old commit's file changes.",
              "",
              "Either way, your local branch no longer points at the commit that the remote branch still has. A later force push can replace the remote branch with your rewritten version."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Watch what happens when the local branch is reset after a commit has already been pushed.",
              "",
              "The normal push is rejected because the remote has a different commit and Git will not rewrite it by accident."
            ],
            "afterMarkdowns": [
              "The push failed. This is Git protecting the remote branch from being rewritten accidentally.",
              "",
              "A force push would overwrite the remote branch pointer with your local branch pointer."
            ],
            "command": "git push",
            "beforeCommand": "git clone;git config user.name Student;git config user.email student@example.com;touch first.txt;git add first.txt;git commit -m 'Add first version';git push;git reset --hard HEAD~1;touch replacement.txt;git add replacement.txt;git commit -m 'Add replacement version'"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Force push should be a last resort, not a normal publishing habit.",
              "",
              "It moves the remote branch pointer. The old commit may still exist for a while, but it is no longer part of the remote branch history that teammates normally see.",
              "",
              "If a teammate already pulled the old commit, your forced update can leave their local history pointing at commits the remote no longer uses.",
              "",
              "When they fetch or pull later, their branch may not line up with the new remote history. They may need to coordinate with you, fetch the forced update, then rebase or reset their local branch onto the new remote state.",
              "",
              "Use force push only when you understand who may be affected and your team agrees that rewriting the remote branch is acceptable."
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
              "You will push one commit, rewrite your local branch with a hard reset and a replacement commit, then force-push that replacement to the remote.",
              "",
              "**1. Create, stage, commit, and push the first version**",
              "",
              "```",
              "touch first.txt;",
              "git add first.txt;",
              "git commit -m \"Add first version\";",
              "git push",
              "```",
              "",
              "**2. Reset local `main` back one commit**",
              "",
              "```",
              "git reset --hard HEAD~1",
              "```",
              "",
              "`git reset --soft HEAD~1` would also move the branch back, but it would keep the old file change staged. In this exercise, use `--hard` so the replacement starts clean.",
              "",
              "**3. Create, stage, and commit the replacement version**",
              "",
              "```",
              "touch replacement.txt;",
              "git add replacement.txt;",
              "git commit -m \"Add replacement version\"",
              "```",
              "",
              "**4. Optional: try a normal push and notice that it is rejected**",
              "",
              "```",
              "git push",
              "```",
              "",
              "**5. Force-push the replacement**",
              "",
              "```",
              "git push --force",
              "```",
              "",
              "The level is complete once the remote `main` points at your replacement commit.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
