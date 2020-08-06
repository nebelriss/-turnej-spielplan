/*
 * This creates a basic round structure with the corresponding player count
 */
const getRound = (playerCount, populateFunc) => {
  const round = [];
  for (let i = 1; i <= (playerCount + 1) / 2; i++) {
    round.push(
      populateFunc ? populateFunc(i, playerCount) : [undefined, undefined],
    );
  }
  return round;
};

/*
 * Helper function to iterate over the rounds
 */
const iterateOverRounds = (rounds, func) =>
  Object.fromEntries(Object.entries(rounds).map(func));

/*
 * It maps the generic numeral keys to a given named key.
 */
const mapGamesToObjectKeys = (rounds, mappingKeys) =>
  iterateOverRounds(rounds, ([key, round]) => [
    key,
    round.map((game) => ({
      [mappingKeys.home]: game[0],
      [mappingKeys.away]: game[1],
    })),
  ]);

/*
 * This removes all games where one of the players is undefined.
 */
const cleanUpForOddPlayers = (rounds) =>
  iterateOverRounds(rounds, ([key, round]) => {
    round = round.filter((game) => {
      if (game[0] === undefined || game[1] === undefined) {
        return false;
      }
      return true;
    });
    return [key, round];
  });

/*
 * It switches the the two participiant in the first game.
 * This is neccesery to prevent that player nr. 1 does not alway play at home.
 */
const switchFirst = (rounds) => {
  return iterateOverRounds(rounds, ([key, round]) => {
    if (key % 2 === 0) {
      round = round.map((game, gameKey) => {
        if (gameKey === 0) game.reverse();
        return game;
      });
    }
    return [key, round];
  });
};

/*
 * This rotates all the players over the games. Expect player 1, who always stays on the same position.
 * After the rotation a new round is returned with the new rotation.
 * Exmaple:
 * 1 - 2    1 - 4
 * 3 - 4 => 2 - 6
 * 5 - 6    3 - 5
 */
const rotate = (round) => {
  const newRound = getRound(round.length * 2);
  for (const [index, value] of round.entries()) {
    if (index === 0) {
      newRound[index + 1][0] = value[1];
      newRound[index][0] = value[0];
      continue;
    }

    if (index == round.length - 1) {
      newRound[index][1] = value[0];
      newRound[index - 1][1] = value[1];
      continue;
    }

    newRound[index + 1][0] = value[0];
    newRound[index - 1][1] = value[1];
  }
  return newRound;
};

/*
 * Different round types for the first round.
 *
 * It is a function which takes index and playerCount.
 * And should return an array with two values, p1 and p2. Which represents a game.
 * P1 and p2 are the corresponding players for home and away in the game.
 */
const roundTypes = {
  firstSecond: (index, playerCount) =>
    ([p1, p2] = [
      index * 2 - 1,
      index <= playerCount / 2 ? index * 2 : undefined,
    ]),
  secondHalf: (index, max) =>
    ([p1, p2] = [
      index,
      index <= max / 2 ? Math.round(max / 2) + index : undefined,
    ]),
};

/*
 * Create a plan with all rounds.
 * The first round takes a roundType function to create the starting condition.
 */
const createPlan = (playerCount, startingRoundType) => {
  let rounds = { 1: getRound(playerCount, roundTypes[startingRoundType]) };

  const count = parseInt((playerCount + 1) / 2) * 2;
  for (let i = 2; i < count; i++) {
    rounds[i] = rotate(rounds[i - 1]);
  }

  if (playerCount % 2 !== 0) {
    rounds = cleanUpForOddPlayers(rounds);
  }

  return switchFirst(rounds);
};

/*
 * Standard config for the library
 */
const getStdConfig = () => ({
  mapHomeAway: true,
  mapHomeAwayKeys: { home: 'home', away: 'away' },
  startingRoundType: 'firstSecond',
});

/**
 * Create a game schedule map for X amound of player using round robin.
 * @param {integer} playerCount The number of players.
 * @param {object} config The configuration.
 */
const spielplan = (playerCount, config = {}) => {
  const userConfig = Object.assign(getStdConfig(), config);

  let schedule = createPlan(playerCount, userConfig.startingRoundType);

  if (userConfig.mapHomeAway) {
    schedule = mapGamesToObjectKeys(schedule, userConfig.mapHomeAwayKeys);
  }

  return schedule;
};

module.exports = spielplan;
