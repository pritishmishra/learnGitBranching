exports.level = {
  "name": {
    "en_US": "Undo Commits Safely"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C2'\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C2'\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\",\"fileChanges\":{\"bug.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\",\"fileChanges\":{\"notes.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\",\"fileChanges\":{\"release.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C2'\":{\"parents\":[\"C4\"],\"id\":\"C2'\",\"fileChanges\":{\"bug.txt\":{\"type\":\"deleted\",\"content\":\"\"}}}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C2'\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\",\"fileChanges\":{\"bug.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\",\"fileChanges\":{\"notes.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\",\"fileChanges\":{\"release.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C2'\":{\"parents\":[\"C4\"],\"id\":\"C2'\",\"fileChanges\":{\"bug.txt\":{\"type\":\"deleted\",\"content\":\"\"}}}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git revert HEAD~2;git push",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C4\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C4\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\",\"fileChanges\":{\"bug.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\",\"fileChanges\":{\"notes.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\",\"fileChanges\":{\"release.txt\":{\"type\":\"added\",\"content\":\"\"}}}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C4\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\",\"fileChanges\":{\"bug.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\",\"fileChanges\":{\"notes.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\",\"fileChanges\":{\"release.txt\":{\"type\":\"added\",\"content\":\"\"}}}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Identify the unwanted pushed commit, revert it with the right relative reference, then push the revert commit"
  },
  "requiredCommandPatterns": [
    "^git +revert +HEAD~2 *$",
    "^git +push *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Undo Commits Safely",
              "",
              "Sometimes the mistake has already been committed.",
              "",
              "`git revert <commit>` creates a new commit that undoes the changes from an older commit. It does not erase the old commit from history.",
              "",
              "That makes revert the safer choice when a commit has been pushed to a remote branch and another person may already have a local copy.",
              "",
              "In this lesson, the commits have already been pushed. Your job is to identify the commit that should be undone, revert it, and push the revert commit too."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "In real projects, you will often choose a specific commit to revert.",
              "",
              "`HEAD` means the current commit. You can count backward from `HEAD` to identify an older commit.",
              "",
              "Common forms are:",
              "",
              "`git revert HEAD` reverts the current commit.",
              "",
              "`git revert HEAD~1` reverts one commit before `HEAD`.",
              "",
              "`git revert HEAD~3` reverts three commits before `HEAD`.",
              "",
              "`git revert abc123` reverts a specific commit id from `git log`."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Revert a Commit",
              "",
              "Watch how `git revert HEAD~1` adds a new commit instead of moving `main` backward. Then `git push` publishes that undo commit to the remote."
            ],
            "afterMarkdowns": [
              "The original commit is still in history locally and on the remote, and the new commit records the undo operation."
            ],
            "command": "git revert HEAD~1;git push",
            "beforeCommand": "git clone;git config user.name Student;git config user.email student@example.com;touch demo-bug.txt;git add demo-bug.txt;git commit -m 'Add demo bug';touch demo-keep.txt;git add demo-keep.txt;git commit -m 'Add demo keep';git push"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "Three commits have already been pushed to `main`:",
              "",
              "* `C2` added `bug.txt`, which should be undone.",
              "",
              "* `C3` added `notes.txt`, which should stay.",
              "",
              "* `C4` added `release.txt`, which should stay.",
              "",
              "Your tasks:",
              "",
              "**1. Identify the commit to revert**",
              "**2. Revert that commit**",
              "",
              "Use `git revert` with the right commit reference.",
              "",
              "**3. Push the revert commit**",
              "",
              "",
              "The lesson is complete once local `main` and the remote both point to the new revert commit shown in the goal picture.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
