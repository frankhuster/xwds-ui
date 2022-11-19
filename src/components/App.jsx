import { useReducer } from 'react';
import gameReducer from '../game/gameReducer';
import Game from '../game/Game';
import './App.css';
import PlayerForm from './PlayerForm';
import GameForm from './GameForm';

function render(game, dispatch) {
  if (game.hasPlayer()) {
    if (game.isOngoing()) {
      return <Game dispatch={dispatch} />;
    } else {
      return <GameForm game={game} dispatch={dispatch} />;
    }
  } else {
    return <PlayerForm dispatch={dispatch} />;
  }
}

export default function App() {
  const [reducedGame, dispatch] = useReducer(gameReducer, {
    playerId: localStorage.getItem('xwds-player-id'),
    playerName: localStorage.getItem('xwds-player-name'),
  });
  const game = new Game(reducedGame);

  return <div className="App">{render(game, dispatch)}</div>;
}
