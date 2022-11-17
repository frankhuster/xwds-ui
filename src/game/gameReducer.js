import Game from './Game';

export default function gameReducer(reducedGame, action) {
  const game = new Game(reducedGame);

  switch (action.type) {
    case 'setPlayer': {
      game.setPlayer(action.id, action.name);
      return game.reduce();
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
