type CellStatus = 'DEAD' | 'ALIVE';

export class Cell {
  constructor(readonly status: CellStatus) {}

  regenerate(numberOfNeighbours: number): CellStatus {
    if (this.status === 'ALIVE') {
      return this.statusForAliveCell(numberOfNeighbours);
    } else {
      return this.statusForDeadCell(numberOfNeighbours);
    }
  }

  private statusForAliveCell(numberOfNeighbours: number) {
    return numberOfNeighbours === 2 || numberOfNeighbours === 3 ? 'ALIVE' : 'DEAD';
  }

  private statusForDeadCell(numberOfNeighbours: number) {
    return numberOfNeighbours === 3 ? 'ALIVE' : 'DEAD';
  }
}
