/*
1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
2. Any live cell with more than three live neighbours dies, as if by overcrowding.
3. Any live cell with two or three live neighbours lives on to the next generation.
4. Any dead cell with exactly three live neighbours becomes a live cell.
 */
import { Cell } from '../core/cell';

describe('In the game of life', () => {
  it('any live cell with fewer than two live neighbours dies, as if caused by underpopulation', () => {
    const numberOfNeighbours = 1;
    expect(Cell.create('ALIVE').nextGeneration(numberOfNeighbours).isAlive()).toBeFalsy();
    expect(Cell.create('DEAD').nextGeneration(numberOfNeighbours).isAlive()).toBeFalsy();
  });
  it('any live cell with more than three live neighbours dies, as if by overcrowding', () => {
    const numberOfNeighbours = 4;
    expect(Cell.create('ALIVE').nextGeneration(numberOfNeighbours).isAlive()).toBeFalsy();
    expect(Cell.create('DEAD').nextGeneration(numberOfNeighbours).isAlive()).toBeFalsy();
  });
  it('any live cell with two or three live neighbours lives on to the next generation', () => {
    expect(Cell.create('ALIVE').nextGeneration(2).isAlive()).toBeTruthy();
    expect(Cell.create('ALIVE').nextGeneration(3).isAlive()).toBeTruthy();
    expect(Cell.create('DEAD').nextGeneration(2).isAlive()).toBeFalsy();
  });
  it('any dead cell with exactly three live neighbours becomes a live cell', () => {
    expect(Cell.create('DEAD').nextGeneration(3).isAlive()).toBeTruthy();
  });
  it('cells with undefined initial state are not allowed', () => {
    expect(() => Cell.create(undefined)).toThrow();
    expect(() => Cell.create(null)).toThrow();
  });
});
