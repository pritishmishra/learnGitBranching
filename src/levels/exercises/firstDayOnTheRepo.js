var startTree = JSON.stringify({
  "branches": {
    "main": {
      "target": "C0",
      "id": "main"
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
});

var goalTree = JSON.stringify({
  "branches": {
    "main": {
      "target": "C1",
      "id": "main",
      "remoteTrackingBranchID": "o/main"
    },
    "o/main": {
      "target": "C1",
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
        "id": "C1"
      }
    },
    "HEAD": {
      "target": "main",
      "id": "HEAD"
    }
  }
});

exports.level = {
  "exerciseNumber": 1,
  "name": {
    "en_US": "First Day on the Repo"
  },
  "goalTreeString": goalTree,
  "solutionCommand": "git clone;git config user.name Student;git config user.email student@example.com;touch introduction.txt;git add introduction.txt;git commit -m 'Add introduction';git push",
  "startTree": startTree,
  "hint": {
    "en_US": "Use git config with user.name and user.email before committing. The file must be staged before git commit can record it."
  },
  "requireStagedChanges": true,
  "requireCleanWorkingTreeForCompletion": true,
  "requiredCommandPatterns": [
    "^git +clone *$",
    "^git +config +user\\.name +['\"]?Student['\"]? *$",
    "^git +config +user\\.email +['\"]?student@example\\.com['\"]? *$",
    "^touch +introduction\\.txt *$",
    "^git +add +introduction\\.txt *$",
    "^git +commit +.*-m +(?!['\"]{2})(['\"][^'\"]+['\"]|\\S.*)$",
    "^git +push( +origin +main)? *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Exercise 1: First Day on the Repo",
              "",
              "### Scenario",
              "",
              "You have joined a project and need to make your first contribution.",
              "",
              "Get a local copy of the repository, identify yourself to Git, create the requested file, record it in history, and publish your work."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Details",
              "",
              "### Starting repository state",
              "",
              "You begin outside a Git repository. A remote starter repository exists and contains an initial commit on `main`.",
              "",
              "Your repository-level Git identity is not configured.",
              "",
              "### Setup already completed",
              "",
              "- Remote starter repository was prepared for you.",
              "- You start outside this repository; clone it to begin.",
              "",
              "### Your objectives",
              "",
              "1. Clone the provided starter repository.",
              "2. Configure the repository-local Git user name as `Student` and email as `student@example.com`.",
              "3. Create `introduction.txt` using `touch`.",
              "4. Stage and commit `introduction.txt` using any non-empty commit message.",
              "5. Push the new commit to `origin/main`.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
