var fs = require('fs');
var ScoreSubmission = require('../../src/js/util/scoreSubmission');

describe('Lesson data submission', function() {
  it('keeps the lesson progress button hook and disclaimer on the lessons panel', function() {
    var view = fs.readFileSync('./src/js/views/levelDropdownView.js', 'utf8');

    expect(view).toContain('lessonSubmitButton');
    expect(view).toContain('Log Lesson Progress');
    expect(view).toContain('This is for Course Diagnostics; not for course credit');
    var panelMarkup = view.slice(view.indexOf('<div class="lessonSubmitPanel'));
    expect(panelMarkup.indexOf('lessonSubmitDisclaimer')).toBeLessThan(
      panelMarkup.indexOf('lessonSubmitStatus')
    );
  });

  it('submits completed lesson ids to a separate endpoint', function() {
    var request;
    var fetchImpl = function(url, options) {
      request = {
        url: url,
        options: options
      };
      return Promise.resolve({
        ok: true,
        json: function() {
          return Promise.resolve({
            count: 2
          });
        }
      });
    };

    return ScoreSubmission.submitLessonData(fetchImpl, [
      'local1',
      'team5'
    ])
      .then(function(result) {
        expect(request.url).toBe('/st/submit_lesson_data.py');
        expect(JSON.parse(request.options.body)).toEqual({
          completed: [
            'local1',
            'team5'
          ]
        });
        expect(result.count).toBe(2);
      });
  });
});
