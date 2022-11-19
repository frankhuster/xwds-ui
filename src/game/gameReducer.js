import Game from './Game';

export default function gameReducer(reducedGame, action) {
  const game = new Game(reducedGame);

  console.log('gameReducer');
  console.log(action);

  switch (action.type) {
    case 'setPlayer': {
      game.setPlayer(action.player_id, action.player_name);
      return game.reduce();
    }

    case 'newGame': {
      game.setGame(action.game_id);
      return game.reduce();
    }

    case 'joinGame': {
      game.setGame(action.game_id);
      return game.reduce();
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
