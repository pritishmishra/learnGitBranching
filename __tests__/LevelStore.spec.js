var LevelActions = require('../src/js/actions/LevelActions');
var LevelStore = require('../src/js/stores/LevelStore');

describe('this store', function() {

  it('has sequences and levels', function() {
    var sequenceMap = LevelStore.getSequenceToLevels();
    Object.keys(sequenceMap).forEach(function(levelSequence) {
      expect(LevelStore.getSequences().indexOf(levelSequence) >= 0)
        .toEqual(true);

      sequenceMap[levelSequence].forEach(function(level) {
        expect(LevelStore.getLevel(level.id)).toEqual(level);
      }.bind(this));
    }.bind(this));
  });

  it('only exposes lessons and exercises sequences', function() {
    expect(LevelStore.getSequences()).toEqual([
      'local',
      'branchMerge',
      'mistakes',
      'team',
      'practiceExercises'
    ]);
  });

  it('can solve a level and then reset', function() {
    var sequenceMap = LevelStore.getSequenceToLevels();
    var firstLevel = sequenceMap[
      Object.keys(sequenceMap)[0]
    ][0];

    expect(LevelStore.isLevelSolved(firstLevel.id))
      .toEqual(false);
    LevelActions.setLevelSolved(firstLevel.id, false);
    expect(LevelStore.isLevelSolved(firstLevel.id))
      .toEqual(true);
    LevelActions.resetLevelsSolved();
    expect(LevelStore.isLevelSolved(firstLevel.id))
      .toEqual(false);
  });

  it('can solve a level with best status and then reset', function() {
    var sequenceMap = LevelStore.getSequenceToLevels();
    var firstLevel = sequenceMap[
      Object.keys(sequenceMap)[0]
    ][0];
  
    expect(LevelStore.isLevelBest(firstLevel.id))
      .toEqual(false);
    LevelActions.setLevelSolved(firstLevel.id, true);
    expect(LevelStore.isLevelBest(firstLevel.id))
      .toEqual(true);
    LevelActions.resetLevelsSolved();
    expect(LevelStore.isLevelBest(firstLevel.id))
      .toEqual(false);
  });

  it('can reset only solved lessons', function() {
    var sequenceMap = LevelStore.getSequenceToLevels();
    var lesson = sequenceMap.local[0];
    var exercise = sequenceMap.practiceExercises[0];

    LevelActions.setLevelSolved(lesson.id, false);
    LevelActions.setLevelSolved(exercise.id, false);
    LevelActions.resetLevelsSolvedByTab('lessons');

    expect(LevelStore.isLevelSolved(lesson.id)).toEqual(false);
    expect(LevelStore.isLevelSolved(exercise.id)).toEqual(true);

    LevelActions.resetLevelsSolved();
  });

  it('can reset only solved exercises', function() {
    var sequenceMap = LevelStore.getSequenceToLevels();
    var lesson = sequenceMap.local[0];
    var exercise = sequenceMap.practiceExercises[0];

    LevelActions.setLevelSolved(lesson.id, false);
    LevelActions.setLevelSolved(exercise.id, false);
    LevelActions.resetLevelsSolvedByTab('exercises');

    expect(LevelStore.isLevelSolved(lesson.id)).toEqual(true);
    expect(LevelStore.isLevelSolved(exercise.id)).toEqual(false);

    LevelActions.resetLevelsSolved();
  });
  

});
