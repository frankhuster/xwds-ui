import { useState } from 'react';

export default function Game({ dispatch }) {
  const [error, setError] = useState(null);

  return <div className="game">PLAYING!!!</div>;
}
