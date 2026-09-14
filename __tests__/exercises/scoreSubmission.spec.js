var fs = require('fs');
var ScoreSubmission = require('../../src/js/util/scoreSubmission');

describe('Practice exercise score submission', function() {
  function response(ok, body) {
    return Promise.resolve({
      ok: ok,
      json: function() {
        return Promise.resolve(body || {});
      }
    });
  }

  it('keeps the submit score button on the exercises panel', function() {
    var template = fs.readFileSync('./src/template.index.html', 'utf8');

    expect(template).toContain('exerciseSubmitButton');
    expect(template).toContain('Submit Score');
  });

  it('collects stable score ids for solved exercises only', function() {
    var levels = [{
      id: 'first',
      scoreId: 'firstStableId'
    }, {
      id: 'second',
      scoreId: 'secondStableId'
    }, {
      id: 'third'
    }];

    var completed = ScoreSubmission.getCompletedScoreIds(
      levels,
      function(id) {
        return id === 'first' || id === 'third';
      }
    );

    expect(completed).toEqual([
      'firstStableId',
      'third'
    ]);
  });

  it('submits zero completed exercises successfully', function() {
    var request;
    var fetchImpl = function(url, options) {
      request = {
        url: url,
        options: options
      };
      return response(true, {
        count: 0,
        completed: []
      });
    };

    return ScoreSubmission.submitScore(fetchImpl, [])
      .then(function(result) {
        expect(request.url).toBe('/st/submit_score.py');
        expect(request.options.method).toBe('POST');
        expect(request.options.credentials).toBe('same-origin');
        expect(request.options.headers['Content-Type']).toBe('application/json');
        expect(JSON.parse(request.options.body)).toEqual({
          completed: []
        });
        expect(result.count).toBe(0);
      });
  });

  it('submits completed exercise ids to the score endpoint', function() {
    var requestBody;
    var fetchImpl = function(url, options) {
      requestBody = JSON.parse(options.body);
      return response(true, {
        count: 2,
        completed: requestBody.completed
      });
    };

    return ScoreSubmission.submitScore(fetchImpl, [
      'firstDayOnTheRepo',
      'twoTimelinesOneHistory'
    ])
      .then(function(result) {
        expect(requestBody).toEqual({
          completed: [
            'firstDayOnTheRepo',
            'twoTimelinesOneHistory'
          ]
        });
        expect(result.count).toBe(2);
      });
  });

  it('fails when the score endpoint rejects the submission', function(done) {
    var fetchImpl = function() {
      return response(false, {
        error: 'not authenticated'
      });
    };

    ScoreSubmission.submitScore(fetchImpl, [])
      .then(function() {
        done.fail('Expected score submission to fail');
      })
      .catch(function(error) {
        expect(error.message).toBe('not authenticated');
        done();
      });
  });

  it('includes the HTTP status when the score endpoint fails without JSON error text', function(done) {
    var fetchImpl = function() {
      return Promise.resolve({
        ok: false,
        status: 500,
        json: function() {
          return Promise.resolve({});
        }
      });
    };

    ScoreSubmission.submitScore(fetchImpl, [])
      .then(function() {
        done.fail('Expected score submission to fail');
      })
      .catch(function(error) {
        expect(error.message).toBe('Could not submit score (HTTP 500)');
        done();
      });
  });
});
