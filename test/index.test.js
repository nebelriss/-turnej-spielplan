const spielplan = require('../lib/index');

test('should return the correct tournament rounds / pairings', () => {
  const expectedAnswer = {
    1: [
      { home: 1, away: 2 },
      { home: 3, away: 4 },
      { home: 5, away: 6 },
    ],
    2: [
      { home: 4, away: 1 },
      { home: 2, away: 6 },
      { home: 3, away: 5 },
    ],
    3: [
      { home: 1, away: 6 },
      { home: 4, away: 5 },
      { home: 2, away: 3 },
    ],
    4: [
      { home: 5, away: 1 },
      { home: 6, away: 3 },
      { home: 4, away: 2 },
    ],
    5: [
      { home: 1, away: 3 },
      { home: 5, away: 2 },
      { home: 6, away: 4 },
    ],
  };
  expect(spielplan(6)).toEqual(expectedAnswer);
});

test('should retrun the correct tounament with odd players', () => {
  const expectedAnswer = {
    1: [
      { home: 1, away: 2 },
      { home: 3, away: 4 },
    ],
    2: [
      { home: 4, away: 1 },
      { home: 3, away: 5 },
    ],
    3: [
      { home: 4, away: 5 },
      { home: 2, away: 3 },
    ],
    4: [
      { home: 5, away: 1 },
      { home: 4, away: 2 },
    ],
    5: [
      { home: 1, away: 3 },
      { home: 5, away: 2 },
    ],
  };
  expect(spielplan(5)).toEqual(expectedAnswer);
});

test('should return the rounds without custom keys for home and away', () => {
  const expectedAnswer = {
    1: [
      [1, 2],
      [3, 4],
      [5, 6],
    ],
    2: [
      [4, 1],
      [2, 6],
      [3, 5],
    ],
    3: [
      [1, 6],
      [4, 5],
      [2, 3],
    ],
    4: [
      [5, 1],
      [6, 3],
      [4, 2],
    ],
    5: [
      [1, 3],
      [5, 2],
      [6, 4],
    ],
  };
  expect(spielplan(6, { mapHomeAway: false })).toEqual(expectedAnswer);
});

test('should return the rounds with custom keys for home and away', () => {
  const expectedAnswer = {
    1: [
      { h: 1, a: 2 },
      { h: 3, a: 4 },
      { h: 5, a: 6 },
    ],
    2: [
      { h: 4, a: 1 },
      { h: 2, a: 6 },
      { h: 3, a: 5 },
    ],
    3: [
      { h: 1, a: 6 },
      { h: 4, a: 5 },
      { h: 2, a: 3 },
    ],
    4: [
      { h: 5, a: 1 },
      { h: 6, a: 3 },
      { h: 4, a: 2 },
    ],
    5: [
      { h: 1, a: 3 },
      { h: 5, a: 2 },
      { h: 6, a: 4 },
    ],
  };
  expect(
    spielplan(6, {
      mapHomeAway: true,
      mapHomeAwayKeys: { home: 'h', away: 'a' },
    }),
  ).toEqual(expectedAnswer);
});
