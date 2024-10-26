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
    expect(new Cell('ALIVE').nextGeneration(numberOfNeighbours).isAlive()).toBeFalsy();
    expect(new Cell('DEAD').nextGeneration(numberOfNeighbours).isAlive()).toBeFalsy();
  });
  it('any live cell with more than three live neighbours dies, as if by overcrowding', () => {
    const numberOfNeighbours = 4;
    expect(new Cell('ALIVE').nextGeneration(numberOfNeighbours).isAlive()).toBeFalsy();
    expect(new Cell('DEAD').nextGeneration(numberOfNeighbours).isAlive()).toBeFalsy();
  });
  it('any live cell with two or three live neighbours lives on to the next generation', () => {
    expect(new Cell('ALIVE').nextGeneration(2).isAlive()).toBeTruthy();
    expect(new Cell('ALIVE').nextGeneration(3).isAlive()).toBeTruthy();
    expect(new Cell('DEAD').nextGeneration(2).isAlive()).toBeFalsy();
  });
  it('any dead cell with exactly three live neighbours becomes a live cell', () => {
    expect(new Cell('DEAD').nextGeneration(3).isAlive()).toBeTruthy();
  });
});
