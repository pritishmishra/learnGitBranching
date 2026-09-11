exports.level = {
  "name": {
    "en_US": "Sync Your Local Copy"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C4\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C3\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\",\"fileChanges\":{\"local.txt\":{\"type\":\"added\",\"content\":\"\"}}},\"C2\":{\"parents\":[\"C0\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C1\",\"C3\"],\"id\":\"C4\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C3\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C2\":{\"parents\":[\"C0\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git fakeTeamwork 2;git pull",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C1\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":[\"main\"]}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\",\"fileChanges\":{\"local.txt\":{\"type\":\"added\",\"content\":\"\"}}}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Simulate teammate commits with git fakeTeamwork 2, then run git pull"
  },
  "requireStagedChanges": true,
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Sync Your Local Copy",
              "",
              "In the last lesson, `git fetch` downloaded remote commits without changing your local branch.",
              "",
              "Most of the time, after you download your teammates' commits, you also want your local branch to include that work.",
              "",
              "`git pull` does both steps: it fetches remote commits, then merges them into your current local branch."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "You can think of `git pull` as a shortcut for two commands:",
              "",
              "`git fetch` downloads the remote commits and updates `o/main`.",
              "",
              "`git merge o/main` brings those downloaded commits into your current local branch.",
              "",
              "Because that fetch-then-merge workflow is so common, Git gives us `git pull` to do both together."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "To practice team workflows, this app includes a teaching command named `git fakeTeamwork`.",
              "",
              "`git fakeTeamwork` simulates another person pushing commits to the remote repository.",
              "",
              "You can also specify how many remote commits to create. For example:",
              "",
              "```",
              "git fakeTeamwork 2",
              "```",
              "",
              "That simulates a teammate pushing two commits to the remote `main` branch."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Fake Teamwork",
              "",
              "Watch `git fakeTeamwork 2` create two commits on the remote repository.",
              "",
              "Your local `main` branch does not know about them yet."
            ],
            "afterMarkdowns": [
              "The remote moved forward, but your local remote-tracking branch has not updated yet.",
              "",
              "This is the situation `git pull` helps with."
            ],
            "command": "git fakeTeamwork 2",
            "beforeCommand": "git clone"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Fetch, Then Merge",
              "",
              "First, watch the two-step version: `git fetch` downloads the remote commits, then `git merge o/main` brings them into local `main`."
            ],
            "afterMarkdowns": [
              "That worked: local `main` now includes the remote commits.",
              "",
              "`git pull` is the shortcut for this common fetch-then-merge sequence."
            ],
            "command": "git fetch;git merge o/main",
            "beforeCommand": "git clone;git fakeTeamwork 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Pull Remote Work",
              "",
              "Here, the remote has two teammate commits and local `main` has one local commit.",
              "",
              "`git pull` fetches the remote commits and merges them into local `main`."
            ],
            "afterMarkdowns": [
              "After `git pull`, local `main` includes both your local commit and the remote commits.",
              "",
              "The remote-tracking branch `o/main` also moved forward to match the remote."
            ],
            "command": "git pull",
            "beforeCommand": "git clone;git fakeTeamwork 2;touch local.txt;git add local.txt;git commit -m 'Add local.txt'"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "A local commit adding `local.txt` has already been created for you.",
              "",
              "**1. Simulate teammate work on the remote**",
              "",
              "```",
              "git fakeTeamwork 2",
              "```",
              "",
              "**2. Sync your local branch with the remote**",
              "",
              "```",
              "git pull",
              "```",
              "",
              "P.S.: You can also try `git fetch` followed by `git merge o/main` to see how that behaves instead of `git pull`.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
