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
    const initialStatusWithOneCell: CellStatus[][] = [['DEAD']];
    const worldWithOneCell = World.create(initialStatusWithOneCell);
    expect(worldWithOneCell.liveNeighboursAt(0, 0)).toEqual(0);

    const initialStatusWithTwoCells: CellStatus[][] = [['ALIVE', 'DEAD']];
    const worldWithTwoCells = World.create(initialStatusWithTwoCells);
    expect(worldWithTwoCells.liveNeighboursAt(0, 1)).toEqual(1);
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
}
