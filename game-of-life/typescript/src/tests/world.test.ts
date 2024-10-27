/*
Creation method
Next Generation method
Number of neighbours for a determinate point
[[DEAD]] (0, 0) -> 0
[[ALIVE, DEAD]] (0, 1) => 1
[[DEAD, DEAD]] (0, 1) => 0
[[ALIVE, DEAD, ALIVE]] (0, 1) => 2
[[ALIVE, DEAD, ALIVE],
[ALIVE, ALIVE, ALIVE]] (0, 1) => 5
[[ALIVE, ALIVE, ALIVE],
[ALIVE, DEAD, ALIVE],
[ALIVE, ALIVE, ALIVE]] (1, 1) => 8
 */
import { Cell, CellStatus } from '../core/cell';

describe('The World', () => {
  it('creates a cell matrix for a given cell status', () => {
    const initialStatus: CellStatus[][] = [
      ['ALIVE', 'DEAD'],
      ['ALIVE', 'ALIVE'],
    ];
    const world = World.create(initialStatus);

    expect(world.cellMatrix).toEqual([
      [Cell.create('ALIVE'), Cell.create('DEAD')],
      [Cell.create('ALIVE'), Cell.create('ALIVE')],
    ]);
  });

  it('counts the number of live neighbours for a given cell', () => {
    expect(World.create([['DEAD']]).liveNeighboursAt(0, 0)).toEqual(0);

    expect(World.create([['ALIVE', 'DEAD']]).liveNeighboursAt(0, 1)).toEqual(1);

    expect(World.create([['DEAD', 'DEAD']]).liveNeighboursAt(0, 1)).toEqual(0);

    expect(World.create([['ALIVE', 'DEAD', 'ALIVE']]).liveNeighboursAt(0, 1)).toEqual(2);

    expect(
      World.create([
        ['ALIVE', 'DEAD', 'ALIVE'],
        ['ALIVE', 'ALIVE', 'ALIVE'],
      ]).liveNeighboursAt(0, 1)
    ).toEqual(5);

    expect(
      World.create([
        ['ALIVE', 'ALIVE', 'ALIVE'],
        ['ALIVE', 'DEAD', 'ALIVE'],
        ['ALIVE', 'ALIVE', 'ALIVE'],
      ]).liveNeighboursAt(1, 1)
    ).toEqual(8);
  });

  it('generates the next generation', () => {
    const worldWithOneCell = World.create([['DEAD']]);
    let expectedNextGeneration = worldWithOneCell;
    expect(worldWithOneCell.nextGeneration()).toEqual(expectedNextGeneration);

    const worldWithTwoCells = World.create([['ALIVE', 'DEAD']]);
    expectedNextGeneration = World.create([['DEAD', 'DEAD']]);
    expect(worldWithTwoCells.nextGeneration()).toEqual(expectedNextGeneration);

    const worldWithTwoDeadCells = World.create([['DEAD', 'DEAD']]);
    expectedNextGeneration = worldWithTwoDeadCells;
    expect(worldWithTwoDeadCells.nextGeneration()).toEqual(expectedNextGeneration);

    const worldWithThreeCells = World.create([['ALIVE', 'DEAD', 'ALIVE']]);
    expectedNextGeneration = World.create([['DEAD', 'DEAD', 'DEAD']]);
    expect(worldWithThreeCells.nextGeneration()).toEqual(expectedNextGeneration);

    const worldWithSixCells = World.create([
      ['ALIVE', 'DEAD', 'ALIVE'],
      ['ALIVE', 'ALIVE', 'ALIVE'],
    ]);
    expectedNextGeneration = World.create([
      ['DEAD', 'DEAD', 'DEAD'],
      ['ALIVE', 'DEAD', 'ALIVE'],
    ]);
    expect(worldWithSixCells.nextGeneration()).toEqual(expectedNextGeneration);

    const worldWithNineCells = World.create([
      ['ALIVE', 'ALIVE', 'ALIVE'],
      ['ALIVE', 'DEAD', 'ALIVE'],
      ['ALIVE', 'ALIVE', 'ALIVE'],
    ]);
    expectedNextGeneration = World.create([
      ['ALIVE', 'DEAD', 'ALIVE'],
      ['DEAD', 'DEAD', 'DEAD'],
      ['ALIVE', 'DEAD', 'ALIVE'],
    ]);
    expect(worldWithNineCells.nextGeneration()).toEqual(expectedNextGeneration);
  });
});

class World {
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
