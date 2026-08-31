var SolutionAvailability = require('../../src/js/level/solutionAvailability');

describe('Practice exercise solution visibility', function() {
  it('fails show solution when the active level is an exercise', function() {
    expect(SolutionAvailability.getShowSolutionBlockedMessage({
      exerciseNumber: 1
    })).toBe(SolutionAvailability.EXERCISE_SOLUTION_BLOCKED_MESSAGE);
  });

  it('allows show solution when the active level is not an exercise', function() {
    expect(SolutionAvailability.getShowSolutionBlockedMessage({})).toBe(null);
  });
});
