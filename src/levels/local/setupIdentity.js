exports.level = {
  "name": {
    "en_US": "Set up your git identity"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git config user.name 'Student';git config user.email 'student@example.com'",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Run: git config user.name \"...\", then git config user.email \"...\""
  },
  "requireUserConfig": true,
  "requiredAnyOrderCommandPatterns": [
    "^git +config +user\\.name +.+$",
    "^git +config +user\\.email +.+$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Set up your git identity",
              "",
              "The GitHub repository has already been cloned for you, so you can start by configuring Git.",
              "",
              "Before Git can create commits, it needs to know who you are. Git stores this identity in configuration values.",
              "",
              "In this exercise, set your name and email address with `git config`. These values will be used as the author information on commits you create later."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Configuration changes do not create commits, so the repository graph will not change in this exercise. You are setting metadata Git will use when you commit later."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "The GitHub repository has already been cloned for you. Configure your Git identity in the terminal:",
              "",
              "**1. Set your name**",
              "```",
              "git config user.name \"Your Name\"",
              "```",
              "",
              "**2. Set your email**",
              "```",
              "git config user.email \"your@email.com\"",
              "```",
              "",
              "The level is complete once both values are set.",
              "",
              "To reopen this task screen later, use the command `objective`."
            ]
          }
        }
      ]
    }
  }
};
