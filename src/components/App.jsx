import { useReducer } from 'react';
import gameReducer from '../game/gameReducer';
import Game from '../game/Game';
import './App.css';
import PlayerForm from './PlayerForm';

function renderPlayer(game, dispatch) {
  if (game.hasPlayer()) {
    return <div>Welcome back, {game.getPlayerName()}</div>;
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

  return <div className="App">{renderPlayer(game, dispatch)}</div>;
}
