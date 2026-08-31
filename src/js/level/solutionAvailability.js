var EXERCISE_SOLUTION_BLOCKED_MESSAGE = 'Solutions are not available for exercises.';

var getShowSolutionBlockedMessage = function(level) {
  return level && level.exerciseNumber ?
    EXERCISE_SOLUTION_BLOCKED_MESSAGE :
    null;
};

exports.getShowSolutionBlockedMessage = getShowSolutionBlockedMessage;
exports.EXERCISE_SOLUTION_BLOCKED_MESSAGE = EXERCISE_SOLUTION_BLOCKED_MESSAGE;
