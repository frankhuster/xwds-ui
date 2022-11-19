import { useState } from 'react';
import './PlayerForm.css';

export default function PlayerForm({ dispatch }) {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  // extract that from this component?
  async function handleSubmit(e) {
    e.preventDefault();

    setStatus('submitting');
    fetch('http://localhost:8080/player', {
      method: 'PUT',
      body: JSON.stringify({ name: name }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          const text = await response.text();
          throw new Error(
            `HTTP ${response.status} - ${response.statusText} : ${text}`
          );
        }
      })
      .then((data) => {
        console.log('success');
        console.log(data);
        setStatus('success');
        setError(null);
        dispatch({
          type: 'setPlayer',
          player_id: data.player_id,
          player_name: name,
        });
      })
      .catch((err) => {
        console.log('error');
        console.log(err);
        setStatus('typing');
        setError(err);
      });
  }

  function handleInputChange(e) {
    setName(e.target.value);
  }

  return (
    <div className="player-form">
      <form onSubmit={handleSubmit}>
        <div className="prompt">Please type your player name to register</div>
        <input
          autoFocus
          value={name}
          onChange={handleInputChange}
          disabled={status === 'submitting'}
        />
        <button disabled={name.length === 0 || status === 'submitting'}>
          Register
        </button>
        {error !== null && <div className="error">{error.message}</div>}
      </form>
    </div>
  );
}
