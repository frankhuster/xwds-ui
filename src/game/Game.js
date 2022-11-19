export default class Game {
  constructor(reducedGame) {
    this.playerId = reducedGame.playerId;
    this.playerName = reducedGame.playerName;
    this.gameId = reducedGame.gameId;
  }

  setPlayer(id, name) {
    this.playerId = id;
    this.playerName = name;
    localStorage.setItem('xwds-player-id', id);
    localStorage.setItem('xwds-player-name', name);
  }

  hasPlayer() {
    return this.playerId && this.playerName;
  }

  getPlayerName() {
    return this.playerName;
  }

  getPlayerId() {
    return this.playerId;
  }

  setGame(id) {
    this.gameId = id;
  }

  isOngoing() {
    return this.gameId;
  }

  reduce() {
    return {
      playerId: this.playerId,
      playerName: this.playerName,
      gameId: this.gameId,
    };
  }
}
