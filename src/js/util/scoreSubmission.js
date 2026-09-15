"use strict";

var SCORE_SUBMISSION_URL = '/st/submit_score.py';
var LESSON_DATA_SUBMISSION_URL = '/st/submit_lesson_data.py';

function getCompletedScoreIds(levels, isLevelSolved) {
  return levels
    .filter(function(level) {
      return isLevelSolved(level.id);
    })
    .map(function(level) {
      return level.scoreId || level.id;
    });
}

function submitCompleted(fetchImpl, url, completed) {
  return fetchImpl(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      completed: completed
    })
  })
    .then(function(response) {
      return response.json()
        .catch(function() {
          return {};
        })
        .then(function(body) {
          if (!response.ok) {
            throw new Error(
              body.error ||
              'Could not submit score' +
                (response.status ? ' (HTTP ' + response.status + ')' : '')
            );
          }
          return body;
        });
    })
    .then(function(body) {
      return {
        count: typeof body.count === 'number' ? body.count : completed.length,
        body: body
      };
    });
}

function submitScore(fetchImpl, completed) {
  return submitCompleted(fetchImpl, SCORE_SUBMISSION_URL, completed);
}

function submitLessonData(fetchImpl, completed) {
  return submitCompleted(fetchImpl, LESSON_DATA_SUBMISSION_URL, completed);
}

exports.SCORE_SUBMISSION_URL = SCORE_SUBMISSION_URL;
exports.LESSON_DATA_SUBMISSION_URL = LESSON_DATA_SUBMISSION_URL;
exports.getCompletedScoreIds = getCompletedScoreIds;
exports.submitCompleted = submitCompleted;
exports.submitScore = submitScore;
exports.submitLessonData = submitLessonData;
