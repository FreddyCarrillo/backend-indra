import { DynamoAppointmentRepository } from '../infrastructure/db/DynamoAppointmentRepository';
import { CreateAppointment } from '../application/CreateAppointment';
import { ListAppointmentsByInsured } from '../application/ListAppointmentsByInsured';

const appointmentRepo = new DynamoAppointmentRepository();
const createAppointment = new CreateAppointment(appointmentRepo);
const listAppointments = new ListAppointmentsByInsured(appointmentRepo);

export const dependencies = {
  createAppointment,
  listAppointments,
};
