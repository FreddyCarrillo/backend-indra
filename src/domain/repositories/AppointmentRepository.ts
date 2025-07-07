import { Appointment } from "../entities/Appointment";

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<void>;
  updateStatus(id: string, status: 'pending' | 'completed'): Promise<void>;
  findByInsuredId(insuredId: string): Promise<Appointment[]>;
  findById(id: string): Promise<Appointment | null>;
}
