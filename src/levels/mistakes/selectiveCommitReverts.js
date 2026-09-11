exports.level = {
  "name": {
    "en_US": "Selective Commit Reverts"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C2'\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C2'\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\",\"fileChanges\":{\"credentials.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\",\"fileChanges\":{\"debug.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\",\"fileChanges\":{\"temp-config.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\",\"fileChanges\":{\"docs.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C1'\":{\"parents\":[\"C4\"],\"id\":\"C1'\",\"fileChanges\":{\"credentials.txt\":{\"type\":\"deleted\",\"content\":\"\"}}},\"C3'\":{\"parents\":[\"C1'\"],\"id\":\"C3'\",\"fileChanges\":{\"temp-config.txt\":{\"type\":\"deleted\",\"content\":\"\"}}},\"C2'\":{\"parents\":[\"C3'\"],\"id\":\"C2'\",\"fileChanges\":{\"debug.txt\":{\"type\":\"deleted\",\"content\":\"\"}}}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C2'\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\",\"fileChanges\":{\"credentials.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\",\"fileChanges\":{\"debug.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\",\"fileChanges\":{\"temp-config.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\",\"fileChanges\":{\"docs.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C1'\":{\"parents\":[\"C4\"],\"id\":\"C1'\",\"fileChanges\":{\"credentials.txt\":{\"type\":\"deleted\",\"content\":\"\"}}},\"C3'\":{\"parents\":[\"C1'\"],\"id\":\"C3'\",\"fileChanges\":{\"temp-config.txt\":{\"type\":\"deleted\",\"content\":\"\"}}},\"C2'\":{\"parents\":[\"C3'\"],\"id\":\"C2'\",\"fileChanges\":{\"debug.txt\":{\"type\":\"deleted\",\"content\":\"\"}}}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git revert HEAD~3;git revert HEAD~2;git revert HEAD~4;git push",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C4\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C4\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\",\"fileChanges\":{\"credentials.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\",\"fileChanges\":{\"debug.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\",\"fileChanges\":{\"temp-config.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\",\"fileChanges\":{\"docs.txt\":{\"type\":\"added\",\"content\":\"\"}}}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C4\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\",\"fileChanges\":{\"credentials.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\",\"fileChanges\":{\"debug.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\",\"fileChanges\":{\"temp-config.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C4\":{\"parents\":[\"C3\"],\"id\":\"C4\",\"fileChanges\":{\"docs.txt\":{\"type\":\"added\",\"content\":\"\"}}}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Revert the unwanted pushed commits one at a time, counting from the current HEAD after each revert, then push the result."
  },
  "requiredCommandPatterns": [
    "^git +revert +HEAD~3 *$",
    "^git +revert +HEAD~2 *$",
    "^git +revert +HEAD~4 *$",
    "^git +push *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Selective Commit Reverts",
              "",
              "Sometimes a pushed history contains several commits that should be undone, but other commits in between should stay.",
              "",
              "For example, a team might review four pushed commits and decide that three of them introduced files that should not stay in the project, while one documentation commit is still useful.",
              "",
              "Use separate revert commits so the original history remains visible and the remote receives an explicit record of each undo."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "Commits `C1` through `C4` have already been pushed to `main`:",
              "",
              "* `C1` added `credentials.txt`, which should go.",
              "",
              "* `C2` added `debug.txt`, which should go.",
              "",
              "* `C3` added `temp-config.txt`, which should go.",
              "",
              "* `C4` added `docs.txt`, which should stay.",
              "",
              "Revert the unwanted commits one at a time so the final history matches the goal picture, then push the result to the remote.",
              "",
              "Remember that each revert creates a new commit, so the distance from `HEAD` changes after every revert.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
