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
    if (numberOfNeighbours === 2 || numberOfNeighbours === 3) {
      return 'ALIVE';
    }
    return 'DEAD';
  }

  private statusForDeadCell(numberOfNeighbours: number) {
    if (numberOfNeighbours === 3) {
      return 'ALIVE';
    }
    return 'DEAD';
  }
}
