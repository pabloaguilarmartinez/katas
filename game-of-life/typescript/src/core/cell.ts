type CellStatus = 'DEAD' | 'ALIVE';

export class Cell {
  constructor(private readonly status: CellStatus) {}

  nextGeneration(numberOfNeighbours: number): Cell {
    return new Cell(this.regenerate(numberOfNeighbours));
  }

  isAlive() {
    return this.status === 'ALIVE';
  }

  private regenerate(numberOfNeighbours: number): CellStatus {
    return this.status === 'ALIVE'
      ? this.statusForAliveCell(numberOfNeighbours)
      : this.statusForDeadCell(numberOfNeighbours);
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
