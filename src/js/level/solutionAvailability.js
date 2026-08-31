var EXERCISE_SOLUTION_BLOCKED_MESSAGE = 'Solutions are not available for exercises.';
var EXERCISE_HINT_BLOCKED_MESSAGE = 'Hints are not available for exercises.';

var getShowSolutionBlockedMessage = function(level) {
  return level && level.exerciseNumber ?
    EXERCISE_SOLUTION_BLOCKED_MESSAGE :
    null;
};

var getHintBlockedMessage = function(level) {
  return level && level.exerciseNumber ?
    EXERCISE_HINT_BLOCKED_MESSAGE :
    null;
};

exports.getShowSolutionBlockedMessage = getShowSolutionBlockedMessage;
exports.getHintBlockedMessage = getHintBlockedMessage;
exports.EXERCISE_SOLUTION_BLOCKED_MESSAGE = EXERCISE_SOLUTION_BLOCKED_MESSAGE;
exports.EXERCISE_HINT_BLOCKED_MESSAGE = EXERCISE_HINT_BLOCKED_MESSAGE;
