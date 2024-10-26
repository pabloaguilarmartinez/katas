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
    const isStablePopulation = numberOfNeighbours === 2 || numberOfNeighbours === 3;
    return isStablePopulation ? 'ALIVE' : 'DEAD';
  }

  private statusForDeadCell(numberOfNeighbours: number) {
    const isFertilePopulation = numberOfNeighbours === 3;
    return isFertilePopulation ? 'ALIVE' : 'DEAD';
  }
}
