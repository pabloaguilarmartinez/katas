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
});

class World {
  private constructor(readonly cellMatrix: Cell[][]) {}

  static create(initialStatus: CellStatus[][]): World {
    const cellMatrix = initialStatus.map((row) => {
      return row.map((cellStatus) => Cell.create(cellStatus));
    });
    return new World(cellMatrix);
  }
}
