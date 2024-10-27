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
    let numberOfLiveNeighbours = 0;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = column - 1; j <= column + 1; j++) {
        const isCurrentCell = i === row && j === column;
        if (isCurrentCell) {
          continue;
        }
        const isOutOfBounds = i < 0 || j < 0 || i >= this.cellMatrix.length || j >= this.cellMatrix[i].length;
        if (isOutOfBounds) {
          continue;
        }
        const neighbourCell = this.cellMatrix[i][j];
        if (neighbourCell.isAlive()) {
          numberOfLiveNeighbours++;
        }
      }
    }
    return numberOfLiveNeighbours;
  }

  nextGeneration(): World {
    return new World(
      this.cellMatrix.map((row, rowIndex) =>
        row.map((cell, cellIndex) => cell.regenerate(this.liveNeighboursAt(rowIndex, cellIndex)))
      )
    );
  }
}
