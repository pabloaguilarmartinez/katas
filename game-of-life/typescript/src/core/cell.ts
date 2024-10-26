export type CellStatus = 'DEAD' | 'ALIVE';

export class Cell {
  private constructor(private readonly status: CellStatus) {}

  static create(status: CellStatus): Cell {
    if (status == null) {
      throw new Error('Cell status cannot be null or undefined');
    }
    return new Cell(status);
  }

  regenerate(numberOfNeighbours: number): Cell {
    const newStatus =
      this.status === 'ALIVE'
        ? this.statusForAliveCell(numberOfNeighbours)
        : this.statusForDeadCell(numberOfNeighbours);
    return new Cell(newStatus);
  }

  isAlive() {
    return this.status === 'ALIVE';
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
