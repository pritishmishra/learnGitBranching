"use strict";

var SCORE_SUBMISSION_URL = '/st/submit_score.py';

function getCompletedScoreIds(levels, isLevelSolved) {
  return levels
    .filter(function(level) {
      return isLevelSolved(level.id);
    })
    .map(function(level) {
      return level.scoreId || level.id;
    });
}

function submitScore(fetchImpl, completed) {
  return fetchImpl(SCORE_SUBMISSION_URL, {
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
            throw new Error(body.error || 'Could not submit score');
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

exports.SCORE_SUBMISSION_URL = SCORE_SUBMISSION_URL;
exports.getCompletedScoreIds = getCompletedScoreIds;
exports.submitScore = submitScore;
