type CellStatus = 'DEAD' | 'ALIVE';

export class Cell {
  constructor(readonly status: CellStatus) {}

  regenerate(numberOfNeighbours: number): CellStatus {
    if (this.status === 'ALIVE') {
      if (numberOfNeighbours === 2 || numberOfNeighbours === 3) {
        return 'ALIVE';
      }
    } else {
      if (numberOfNeighbours === 3) {
        return 'ALIVE';
      }
    }
    return 'DEAD';
  }
}
