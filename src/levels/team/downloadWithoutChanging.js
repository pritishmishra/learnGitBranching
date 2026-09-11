exports.level = {
  "name": {
    "en_US": "Download Without Changing"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\"},\"bugFix\":{\"target\":\"C3\",\"id\":\"bugFix\"},\"o/main\":{\"target\":\"C5\",\"id\":\"o/main\"},\"o/bugFix\":{\"target\":\"C7\",\"id\":\"o/bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\"],\"id\":\"C4\"},\"C6\":{\"parents\":[\"C3\"],\"id\":\"C6\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C5\",\"id\":\"main\"},\"bugFix\":{\"target\":\"C7\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C3\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"] ,\"id\":\"C7\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git fetch",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C2\",\"id\":\"main\"},\"bugFix\":{\"target\":\"C3\",\"id\":\"bugFix\"},\"o/main\":{\"target\":\"C2\",\"id\":\"o/main\"},\"o/bugFix\":{\"target\":\"C3\",\"id\":\"o/bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"] ,\"id\":\"C3\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C5\",\"id\":\"main\"},\"bugFix\":{\"target\":\"C7\",\"id\":\"bugFix\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C1\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C2\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C3\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C6\"],\"id\":\"C7\"}},\"HEAD\":{\"target\":\"bugFix\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Run git fetch to download remote commits without moving your local branches"
  },
  "requiredCommandPatterns": [
    "^git +fetch( +origin( +(main|bugFix))?)? *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Download Without Changing",
              "",
              "When you work with a team, other people may push commits to the remote repository while you continue working locally.",
              "",
              "`git fetch` downloads commits from the remote repository and updates your local view of the remote branches."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Before getting into the details of `git fetch`, let's see it in action.",
              "",
              "Here the remote repository contains commits that your local repository has not downloaded yet."
            ],
            "afterMarkdowns": [
              "The missing commits were downloaded into your local repository.",
              "",
              "`o/main` and `o/bugFix` moved forward to match the remote branches, but your local `main`, local `bugFix`, and checked-out branch did not move."
            ],
            "command": "git fetch",
            "beforeCommand": "git clone;git checkout -b bugFix;git push -u origin bugFix;git fakeTeamwork main 2;git fakeTeamwork bugFix 2"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "### Fetch One Branch",
              "",
              "You can also fetch updates for one branch at a time.",
              "",
              "`git fetch origin bugFix` downloads updates from the remote `bugFix` branch without updating every remote-tracking branch."
            ],
            "afterMarkdowns": [
              "`o/bugFix` moved forward because that was the branch you fetched.",
              "",
              "`o/main` did not move, even though the remote `main` branch also has commits your local repository has not downloaded yet."
            ],
            "command": "git fetch origin bugFix",
            "beforeCommand": "git clone;git checkout -b bugFix;git push -u origin bugFix;git fakeTeamwork main 2;git fakeTeamwork bugFix 2"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### What fetch does",
              "",
              "`git fetch` performs two main steps:",
              "",
              "* downloads commits that the remote has but your local repository is missing",
              "* updates your remote-tracking branches, like `o/main`",
              "",
              "`git fetch` brings your local view of the remote repository up to date with what the actual remote repository looks like right now."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "### What fetch does not do",
              "",
              "`git fetch` does not change your local branch or your working files.",
              "",
              "That is the key idea in this lesson: fetch downloads information safely, but it does not merge that work into your branch.",
              "",
              "You can think of `git fetch` as a download-only step."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "The remote has commits that your local remote-tracking branches do not know about yet.",
              "",
              "Download the remote commits without changing your local branch:",
              "",
              "```",
              "git fetch",
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
