# @turnej/spielplan

This packet creates a schedule based on the specified number of players.

## Installation

Install the package with:

```sh
npm install @turnej/spielplan --save
# or
yarn add @turnej/spielplan
```

## Usage

```js
const spielplan = require('@turnej/spielplan');
const schedule = spielplan(6);
```

```js
import spielplan from '@turnej/spielplan';
const schedule = spielplan(6);
```

```js
games = {
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
```

## Description

spielplan(playerCount, config)

### config

- mapHomeAway
- mapHomeAwayKeys
- startingRoundType
- mapPlayerNames
