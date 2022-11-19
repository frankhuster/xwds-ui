import { useState } from 'react';
import './GameForm.css';

export default function GameForm({ game, dispatch }) {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('fetching');
  const [openGames, setOpenGames] = useState([]);

  function fetchOpenGames() {
    fetch('http://localhost:8080/open-games', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          const text = response.text();
          throw new Error(
            `HTTP ${response.status} - ${response.statusText} : ${text}`
          );
        }
      })
      .then((data) => {
        console.log('success');
        console.log(data);
        setStatus('choosing');
        setOpenGames(data);
        setError(null);
      })
      .catch((err) => {
        console.log('error');
        console.log(err);
        setError(err);
        setStatus('error');
      });
  }

  function handleNewGame() {
    fetch('http://localhost:8080/game', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        player_id: game.getPlayerId(),
        player_name: game.getPlayerName(),
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((data) => {
        console.log('success');
        console.log(data.game_id);
        dispatch({ type: 'newGame', game_id: data.game_id });
      })
      .catch((error) => {
        error.text().then((message) => {
          console.log('error');
          console.log(message);
          setError(message);
          setStatus('error');
        });
      });
  }

  function renderOpenGames() {
    return (
      <div className="open-games">
        {openGames.map((e) => (
          <button key={e.id} onClick={() => handleJoinGame(e.id)}>
            Play with {e.players.map((p) => p.name).join(', ')}
          </button>
        ))}
      </div>
    );
  }

  function handleJoinGame(game_id) {
    fetch(`http://localhost:8080/game/${game_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        player_id: game.getPlayerId(),
        player_name: game.getPlayerName(),
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('success');
          setStatus('new-game');
          setError(null);
          dispatch({ type: 'joinGame', game_id: game_id });
        } else {
          throw new Error(
            `HTTP ${response.status} - ${response.statusText} : ${response.text}`
          );
        }
      })
      .then((error) => {})
      .catch((err) => {
        console.log('error');
        console.log(err);
        setError(err);
        setStatus('error');
      });
  }

  if (status === 'fetching' && openGames.length < 1) {
    console.log(`status=${status}`);
    console.log(`openGames=${JSON.stringify(openGames)}`);
    fetchOpenGames();
  }

  return (
    <div className="game-form">
      {status === 'fetching' && (
        <div className="fetching">Fetching open games...</div>
      )}
      {status === 'error' && <div className="error">{error}</div>}
      {status === 'choosing' && (
        <div className="choosing">
          <div className="new-game">
            <button onClick={handleNewGame}>Start New Game</button>
          </div>
          <div className="open-games">{renderOpenGames()}</div>
        </div>
      )}
    </div>
  );
}
