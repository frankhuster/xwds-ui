export default class Game {
  constructor(reducedGame) {
    this.playerId = reducedGame.playerId;
    this.playerName = reducedGame.playerName;
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

  reduce() {
    return {
      playerId: this.playerId,
      playerName: this.playerName,
    };
  }
}
