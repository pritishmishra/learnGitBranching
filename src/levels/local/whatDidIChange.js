exports.level = {
  "name": {
    "en_US": "What Did I Change?"
  },
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "touch notes.txt;echo \"New file content\" > notes.txt;git status;git diff;git add notes.txt;git status;git diff --staged",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"o/main\":{\"target\":\"C0\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C0\",\"id\":\"main\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "hint": {
    "en_US": "Run: touch notes.txt, echo \"New file content\" > notes.txt, git status, git diff, git add notes.txt, git status, git diff --staged"
  },
  "requireStagedChangesForCompletion": true,
  "requiredCommandPatterns": [
    "^touch +notes\\.txt($| +)",
    "^echo +.+ +(>|&gt;) +notes\\.txt *$",
    "^git +status *$",
    "^git +diff *$",
    "^git +add +notes\\.txt *$",
    "^git +status *$",
    "^git +diff +(--staged|--cached) *$"
  ],
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## What Did I Change?",
              "",
              "The remote repository has already been cloned for you, so you can focus on inspecting local changes.",
              "",
              "Before you commit, Git gives you tools to inspect your work.",
              "",
              "`git status` tells you which files changed and whether those changes are staged.",
              "",
              "`git diff` shows the actual line-by-line changes in your working directory.",
              "",
              "For example, after `echo \"New file content\" > notes.txt`, `git diff` will show that `notes.txt` now has a new line: `New file content`.",
              "",
              "`git diff --staged` shows the line-by-line changes that are already staged for the next commit.",
              "",
              "After you stage the file, `git diff` will be empty and `git diff --staged` will show that same change in the staging area."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "In this lesson, you will create a file, write text into it, inspect the unstaged change, stage it, and then inspect the staged change.",
              "",
              "`touch notes.txt` creates the file. `echo \"New file content\" > notes.txt` writes the text `New file content` into that file.",
              "",
              "The commit graph will not change in this lesson because you are not creating a commit yet. You are learning how to check what Git sees before you save a snapshot."
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Your Task",
              "",
              "**1. Create a file**",
              "```",
              "touch notes.txt",
              "```",
              "",
              "**2. Write text into the file**",
              "```",
              "echo \"New file content\" > notes.txt",
              "```",
              "",
              "**3. Check the working directory**",
              "```",
              "git status",
              "```",
              "",
              "**4. Inspect the unstaged change**",
              "```",
              "git diff",
              "```",
              "",
              "**5. Stage the file**",
              "```",
              "git add notes.txt",
              "```",
              "",
              "**6. Check the staged state**",
              "```",
              "git status",
              "```",
              "",
              "**7. Inspect the staged change**",
              "```",
              "git diff --staged",
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
