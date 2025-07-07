import { Appointment } from "../entities/Appointment";

export interface AppointmentCountryRepository {
  saveCountryAppointment(appointment: Appointment): Promise<void>;
}