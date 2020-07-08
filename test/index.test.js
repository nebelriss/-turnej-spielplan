const spielplan = require('./index');

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
