# Lesson Tests

This document describes the focused tests for the guided Lessons tab. These
tests are separate from the standalone exercise tests.

Run the lesson suite with:

```bash
yarn test:lessons
```

## What This Suite Checks

The lesson suite checks every level sequence registered under the Lessons tab.
For each lesson, it runs the lesson's guided solution commands and verifies that
the lesson reaches its expected goal state.

The suite also checks that the practice exercises are not included in the
lesson-only run.

## Difference From Exercise Tests

Lesson tests validate the guided teaching path. They answer: does each lesson's
own solution still complete the lesson?

Exercise tests validate standalone practice scenarios. They answer: does a
student workflow pass, and do common incorrect workflows fail?

Use `yarn test:lessons` when changing lesson text, lesson ordering, level setup,
or lesson goal states. Use `yarn test:exercises` when changing the standalone
Exercises tab or its validation rules.
