var HeadlessGit = require('../src/js/git/headless').HeadlessGit;

var runCommands = function(commandText) {
  var headless = new HeadlessGit();
  var commandPromise = {};
  commandPromise.promise = new Promise(function(resolve) {
    commandPromise.resolve = resolve;
  });

  return headless.sendCommand(commandText, commandPromise)
    .then(function() {
      return commandPromise.promise;
    })
    .then(function(commands) {
      return {
        headless: headless,
        commands: commands
      };
    });
};

describe('Echo command', function() {
  it('writes quoted text to a new file in the working directory', function() {
    return runCommands('echo "Hello CSC207" > notes.txt').then(function(result) {
      expect(result.headless.gitEngine.workingDirectoryChanges).toEqual({
        'notes.txt': {
          type: 'added',
          content: 'Hello CSC207'
        }
      });
    });
  });

  it('stages and commits files created with echo', function() {
    return runCommands(
      'echo "Hello CSC207" > notes.txt;' +
      'git config user.name Student;' +
      'git config user.email student@example.com;' +
      'git add notes.txt;' +
      'git commit -m "Add notes"'
    ).then(function(result) {
      var headCommit = result.headless.gitEngine.getCommitFromRef('HEAD');
      expect(headCommit.get('fileChanges')).toEqual({
        'notes.txt': {
          type: 'added',
          content: 'Hello CSC207'
        }
      });
    });
  });

  it('appends to known local file content', function() {
    return runCommands(
      'echo "First line" > notes.txt;' +
      'echo "Second line" > notes.txt'
    ).then(function(result) {
      expect(result.headless.gitEngine.workingDirectoryChanges).toEqual({
        'notes.txt': {
          type: 'added',
          content: 'First line\nSecond line'
        }
      });
    });
  });

  it('appends to known committed file content', function() {
    return runCommands(
      'git config user.name Student;' +
      'git config user.email student@example.com;' +
      'echo "First line" > notes.txt;' +
      'git add notes.txt;' +
      'git commit -m "Add notes";' +
      'echo "Second line" > notes.txt'
    ).then(function(result) {
      expect(result.headless.gitEngine.workingDirectoryChanges).toEqual({
        'notes.txt': {
          type: 'modified',
          content: 'First line\nSecond line'
        }
      });
    });
  });

  it('requires redirection to a filepath', function() {
    return runCommands('echo "Hello CSC207" >').then(function(result) {
      var command = result.commands[0];
      expect(command.get('error').get('msg')).toBe(
        'Usage: echo "message" > <filepath>'
      );
    });
  });
});
