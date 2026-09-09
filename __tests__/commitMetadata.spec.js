var HeadlessGit = require('../src/js/git/headless').HeadlessGit;

describe('Commit metadata defaults', function() {
  it('uses CSC207 defaults for seeded commits', function() {
    var headless = new HeadlessGit();
    var rootCommit = headless.gitEngine.getCommitFromRef('C0');

    expect(rootCommit.get('author')).toBe('CSC207 Staff');
    expect(rootCommit.get('commitMessage')).toBe('Initial setup');
  });
});
