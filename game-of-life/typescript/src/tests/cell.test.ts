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
    expect(new Cell('ALIVE').regenerate(numberOfNeighbours)).toBe('DEAD');
    expect(new Cell('DEAD').regenerate(numberOfNeighbours)).toBe('DEAD');
  });
  it('any live cell with more than three live neighbours dies, as if by overcrowding', () => {
    const numberOfNeighbours = 4;
    expect(new Cell('ALIVE').regenerate(numberOfNeighbours)).toBe('DEAD');
    expect(new Cell('DEAD').regenerate(numberOfNeighbours)).toBe('DEAD');
  });
  it('any live cell with two or three live neighbours lives on to the next generation', () => {
    expect(new Cell('ALIVE').regenerate(2)).toBe('ALIVE');
    expect(new Cell('ALIVE').regenerate(3)).toBe('ALIVE');
    expect(new Cell('DEAD').regenerate(2)).toBe('DEAD');
  });
  it('any dead cell with exactly three live neighbours becomes a live cell', () => {
    expect(new Cell('DEAD').regenerate(3)).toBe('ALIVE');
  });
});
