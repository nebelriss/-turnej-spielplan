/*
 * This creates a basic round structure with the corresponding player count
 * where all players in the games are undefined.
 */
const getRound = (playerCount) => {
  const round = [];
  for (let i = 1; i <= (playerCount + 1) / 2; i++) {
    round.push([undefined, undefined]);
  }
  return round;
};

const iterateOverRounds = (rounds, func) =>
  Object.fromEntries(Object.entries(rounds).map(func));

/*
 * Populates all undefinded with the playerCount number.
 */
const populateFirstRound = (round, playerCount) => {
  let counter = 1;
  return round.map((game) =>
    game.map(() => {
      if (counter <= playerCount) return counter++;
    }),
  );
};

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

const createPlan = (playerCount) => {
  let rounds = { 1: populateFirstRound(getRound(playerCount), playerCount) };

  const count = parseInt((playerCount + 1) / 2) * 2;
  for (let i = 2; i < count; i++) {
    rounds[i] = rotate(rounds[i - 1]);
  }

  if (playerCount % 2 !== 0) {
    rounds = cleanUpForOddPlayers(rounds);
  }

  return switchFirst(rounds);
};

/**
 * Create a game schedule map for X amound of player using round robin.
 * @param {integer} playerCount The number of players.
 * @param {object} config The configuration.
 */
const spielplan = (playerCount, config = {}) => {
  const stdConfig = {
    mapHomeAway: true,
    mapHomeAwayKeys: { home: 'home', away: 'away' },
  };
  const combinedConfig = Object.assign(stdConfig, config);

  let schedule = createPlan(playerCount);
  if (combinedConfig.mapHomeAway) {
    schedule = mapGamesToObjectKeys(schedule, combinedConfig.mapHomeAwayKeys);
  }
  return schedule;
};

module.exports = spielplan;
