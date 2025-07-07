import { Appointment } from "../domain/entities/Appointment";
import { AppointmentRepository } from "../domain/repositories/AppointmentRepository";

export class ListAppointmentsByInsured {
  constructor(private appointmentRepo: AppointmentRepository) {}

  async execute(insuredId: string): Promise<Appointment[]> {
    if(!/^[0-9]{5}$/.test(insuredId)) {
      throw new Error("El insuredId debe tener 5 dígitos");
    }
    return this.appointmentRepo.findByInsuredId(insuredId);
  }
}
