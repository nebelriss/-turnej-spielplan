const populateFirstRound = (round, maxCount) => {
  let counter = 1;
  return round.map((match) =>
    match.map((item) => {
      if (counter <= maxCount) return counter++;
    }),
  );
};

const getRound = (amount) => {
  const round = [];
  for (let i = 1; i <= (amount + 1) / 2; i++) {
    round.push([undefined, undefined]);
  }
  return round;
};

const mapGamesToObjectKeys = (rounds) => {
  return Object.fromEntries(
    Object.entries(rounds).map(([key, round]) => [
      key,
      round.map((game) => ({ home: game[0], away: game[1] })),
    ]),
  );
};

const cleanUpForOddPlayers = (rounds) => {
  return Object.fromEntries(
    Object.entries(rounds).map(([key, round]) => {
      round = round.filter((game) => {
        if (game[0] === undefined || game[1] === undefined) {
          return false;
        }
        return true;
      });
      return [key, round];
    }),
  );
};

const switchFirst = (rounds) => {
  return Object.fromEntries(
    Object.entries(rounds).map(([key, round]) => {
      if (key % 2 === 0) {
        round = round.map((game, gameKey) => {
          if (gameKey === 0) game.reverse();
          return game;
        });
      }
      return [key, round];
    }),
  );
};

const rotate = (arr) => {
  const newRound = getRound(arr.length * 2);
  for (const [index, value] of arr.entries()) {
    if (index === 0) {
      newRound[index + 1][0] = value[1];
      newRound[index][0] = value[0];
      continue;
    }

    if (index == arr.length - 1) {
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
  let firstRound = getRound(playerCount, true);
  firstRound = populateFirstRound(firstRound, playerCount);
  let rounds = { 1: firstRound };
  const count = parseInt((playerCount + 1) / 2) * 2;
  for (let i = 2; i < count; i++) {
    rounds[i] = rotate(rounds[i - 1]);
  }
  rounds = cleanUpForOddPlayers(rounds);
  return rounds;
};

/**
 *
 * @param {integer} players The number of players.
 * @param {object} config The configuration.
 *
 * Create a game schedule map for X amound of player using round robin.
 */
const spielplan = (players, config) => {
  let schedule = createPlan(players);
  schedule = switchFirst(schedule);
  schedule = mapGamesToObjectKeys(schedule);
  return schedule;
};

module.exports = spielplan;
