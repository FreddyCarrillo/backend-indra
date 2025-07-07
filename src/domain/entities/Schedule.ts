export class Schedule {
  constructor(
    public id: number,
    public centerId: number,
    public specialtyId: number,
    public medicId: number,
    public date: string
  ) {}
}
