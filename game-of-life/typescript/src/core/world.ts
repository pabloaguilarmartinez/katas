import { Cell, CellStatus } from './cell';

export class World {
  private constructor(readonly cellMatrix: Cell[][]) {}

  static create(initialStatus: CellStatus[][]): World {
    const cellMatrix = initialStatus.map((row) => {
      return row.map((cellStatus) => Cell.create(cellStatus));
    });
    return new World(cellMatrix);
  }

  liveNeighboursAt(row: number, column: number): number {
    return (
      this.liveColumnNeighbours(row, column) +
      this.liveNeighboursInNextRow(row, column) +
      this.liveNeighboursInPreviousRow(row, column)
    );
  }

  nextGeneration(): World {
    return new World(
      this.cellMatrix.map((row, rowIndex) =>
        row.map((cell, cellIndex) => cell.regenerate(this.liveNeighboursAt(rowIndex, cellIndex)))
      )
    );
  }

  private liveColumnNeighbours(row: number, column: number): number {
    let numberOfLiveNeighbours = 0;
    const previousColumn = column - 1;
    if (previousColumn >= 0 && this.cellIsAliveAt(row, previousColumn)) {
      numberOfLiveNeighbours++;
    }
    const nextColumn = column + 1;
    const rowLength = this.cellMatrix[row].length;
    if (nextColumn < rowLength && this.cellIsAliveAt(row, nextColumn)) {
      numberOfLiveNeighbours++;
    }
    return numberOfLiveNeighbours;
  }

  private liveNeighboursInPreviousRow(row: number, column: number): number {
    let numberOfLiveNeighbours = 0;
    const previousRow = row - 1;
    if (previousRow >= 0) {
      if (this.cellIsAliveAt(previousRow, column)) {
        numberOfLiveNeighbours++;
      }
      numberOfLiveNeighbours += this.liveColumnNeighbours(previousRow, column);
    }
    return numberOfLiveNeighbours;
  }

  private liveNeighboursInNextRow(row: number, column: number): number {
    let numberOfLiveNeighbours = 0;
    const nextRow = row + 1;
    const columnLength = this.cellMatrix.length;
    if (nextRow < columnLength) {
      if (this.cellIsAliveAt(nextRow, column)) {
        numberOfLiveNeighbours++;
      }
      numberOfLiveNeighbours += this.liveColumnNeighbours(nextRow, column);
    }
    return numberOfLiveNeighbours;
  }

  private cellIsAliveAt(row: number, column: number): boolean {
    return this.cellMatrix[row][column].isAlive();
  }
}
