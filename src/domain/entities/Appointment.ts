export type AppointmentStatus = 'pending' | 'completed';

export class Appointment {
  constructor(
    public id: string, // UUID
    public insuredId: string,
    public scheduleId: number,
    public countryISO: 'PE' | 'CL',
    public status: AppointmentStatus,
    public createdAt: Date,
    public updatedAt: Date
  ){}
}
