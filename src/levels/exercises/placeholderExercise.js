var baseTree = JSON.stringify({
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

exports.makePlaceholderExercise = function(number, title) {
  return {
    "name": {
      "en_US": title
    },
    "goalTreeString": baseTree,
    "solutionCommand": "git status",
    "startTree": baseTree,
    "hint": {
      "en_US": "This exercise shell is ready. The challenge steps will be added later."
    },
    "requiredCommandPatterns": [
      "^git +status *$"
    ],
    "startDialog": {
      "en_US": {
        "childViews": [
          {
            "type": "ModalAlert",
            "options": {
              "markdowns": [
                "## Exercise " + number + ": " + title,
                "",
                "This exercise placeholder is ready.",
                "",
                "The full challenge instructions and validation will be added in a later pass.",
                "",
                "For now, run `git status` to complete the placeholder.",
                "",
                "To reopen this task screen later, use the command `objective`."
              ]
            }
          }
        ]
      }
    }
  };
};
