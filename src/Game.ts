export class Game {
  private _lastSymbol: string = " ";
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    //if first move
    if (this._lastSymbol == " ") {
      //if player is X
      if (symbol == "O") {
        throw new Error("Invalid first player");
      }
    }
    //if not first move but player repeated
    else if (symbol == this._lastSymbol) {
      throw new Error("Invalid next player");
    }
    //if not first move but play on an already played tile
    else if (this._board.TileAt(x, y).Symbol != " ") {
      throw new Error("Invalid position");
    }

    // update game state
    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  public isPositionEmpty(x: number, y: number): boolean {
    return this._board.TileAt(x, y)!.Symbol != " ";
  }

  public isRowTaken(row: number) {
    return (
      this.isPositionEmpty(row, 0) &&
      this.isPositionEmpty(row, 1) &&
      this.isPositionEmpty(row, 2)
    );
  }

  public isTheRowFullWithTheSameSymbol(row: number): string  {
    if (
        this._board.TileAt(row, 0)!.Symbol == this._board.TileAt(row, 1)!.Symbol &&
        this._board.TileAt(row, 2)!.Symbol == this._board.TileAt(row, 1)!.Symbol
    ) {
      return this._board.TileAt(row, 0)!.Symbol ;
    }

    return " ";
  }

  public Winner(): string {
    if (this.isRowTaken(0)) {
      return this.isTheRowFullWithTheSameSymbol(0)
    }

    if (this.isRowTaken(1)) {
      return this.isTheRowFullWithTheSameSymbol(1)
    }

    if (this.isRowTaken(2)) {
      return this.isTheRowFullWithTheSameSymbol(2)
    }

    return " ";
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
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: " " };
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
