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
import { World } from '../core/world';

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
    const world = World.create([
      ['DEAD', 'ALIVE', 'DEAD'],
      ['DEAD', 'ALIVE', 'DEAD'],
      ['DEAD', 'ALIVE', 'DEAD'],
    ]);

    expect(world.nextGeneration().cellMatrix).toEqual([
      [Cell.create('DEAD'), Cell.create('DEAD'), Cell.create('DEAD')],
      [Cell.create('ALIVE'), Cell.create('ALIVE'), Cell.create('ALIVE')],
      [Cell.create('DEAD'), Cell.create('DEAD'), Cell.create('DEAD')],
    ]);

    const world2 = World.create([
      ['ALIVE', 'ALIVE', 'ALIVE'],
      ['ALIVE', 'DEAD', 'ALIVE'],
      ['ALIVE', 'ALIVE', 'ALIVE'],
    ]);

    expect(world2.nextGeneration().cellMatrix).toEqual([
      [Cell.create('ALIVE'), Cell.create('DEAD'), Cell.create('ALIVE')],
      [Cell.create('DEAD'), Cell.create('DEAD'), Cell.create('DEAD')],
      [Cell.create('ALIVE'), Cell.create('DEAD'), Cell.create('ALIVE')],
    ]);
  });

  it('never changes for a given initial block pattern', () => {
    const world = World.create([
      ['ALIVE', 'ALIVE', 'DEAD'],
      ['ALIVE', 'ALIVE', 'DEAD'],
      ['DEAD', 'DEAD', 'DEAD'],
    ]);

    const nextWorld = world.nextGeneration().nextGeneration().nextGeneration();

    expect(nextWorld).toEqual(world);
  });

  it('reestablishes the same state after two generation given a oscillator pattern', () => {
    const world = World.create([
      ['DEAD', 'ALIVE', 'DEAD'],
      ['DEAD', 'ALIVE', 'DEAD'],
      ['DEAD', 'ALIVE', 'DEAD'],
    ]);

    const nextWorld = world.nextGeneration().nextGeneration();

    expect(nextWorld).toEqual(world);
  });
});
