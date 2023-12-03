
const blankSpace = ' ';
const player_o = 'O';
const origin = 0 ;
const INVALID_FIRST_PLAYER_MESSAGE = 'Invalid first player';
const INVALID_NEXT_PLAYER_MESSAGE = 'Invalid next player';
const INVALID_POSITION_MESSAGE = 'Invalid position';

export class Game {
  private _lastSymbol = blankSpace;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == blankSpace) {
      if (player == player_o) {
        throw new Error(INVALID_FIRST_PLAYER_MESSAGE);
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error(INVALID_NEXT_PLAYER_MESSAGE);
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != blankSpace) {
      throw new Error(INVALID_POSITION_MESSAGE);
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
      return this._board.TileAt(origin, origin)!.Symbol;
    }

    if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
      return this._board.TileAt(1, origin)!.Symbol;
    }

    if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
      return this._board.TileAt(2, origin)!.Symbol;
    }

    return ' ';
  }

  private isFirstRowFull() {
    return (
      this._board.TileAt(origin, origin)!.Symbol != blankSpace &&
      this._board.TileAt(origin, 1)!.Symbol != blankSpace &&
      this._board.TileAt(origin, 2)!.Symbol != blankSpace
    );
  }

  private isFirstRowFullWithSameSymbol() {
    return (
      this._board.TileAt(origin, origin)!.Symbol == this._board.TileAt(origin, 1)!.Symbol &&
      this._board.TileAt(origin, 2)!.Symbol == this._board.TileAt(origin, 1)!.Symbol
    );
  }

  private isSecondRowFull() {
    return (
      this._board.TileAt(1, origin)!.Symbol != blankSpace &&
      this._board.TileAt(1, 1)!.Symbol != blankSpace &&
      this._board.TileAt(1, 2)!.Symbol != blankSpace
    );
  }

  private isSecondRowFullWithSameSymbol() {
    return (
      this._board.TileAt(1, origin)!.Symbol == this._board.TileAt(1, 1)!.Symbol &&
      this._board.TileAt(1, 2)!.Symbol == this._board.TileAt(1, 1)!.Symbol
    );
  }

  private isThirdRowFull() {
    return (
      this._board.TileAt(2, origin)!.Symbol != blankSpace &&
      this._board.TileAt(2, 1)!.Symbol != blankSpace &&
      this._board.TileAt(2, 2)!.Symbol != blankSpace
    );
  }

  private isThirdRowFullWithSameSymbol() {
    return (
      this._board.TileAt(2, origin)!.Symbol == this._board.TileAt(2, 1)!.Symbol &&
      this._board.TileAt(2, 2)!.Symbol == this._board.TileAt(2, 1)!.Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = origin; i < 3; i++) {
      for (let j = origin; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: blankSpace };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
