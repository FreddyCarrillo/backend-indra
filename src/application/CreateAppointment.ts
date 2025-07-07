import { Appointment } from "../domain/entities/Appointment";
import { AppointmentRepository } from "../domain/repositories/AppointmentRepository";
import { v4 as uuidv4 } from "uuid";

export class CreateAppointment {
  constructor(private appointmentRepo: AppointmentRepository){}

  async execute(input: {
    insuredId: string;
    scheduleId: number;
    countryISO: "PE" | "CL";
  }): Promise<Appointment> {

    if(!/^[0-9]{5}$/.test(input.insuredId)) {
      throw new Error("El insuredId debe tener 5 dígitos");
    }

    if(!["PE", "CL"].includes(input.countryISO)) {
      throw new Error("countryISO debe ser PE o CL");
    }

    const now = new Date();
    const appointment = new Appointment(
      uuidv4(),
      input.insuredId,
      input.scheduleId,
      input.countryISO,
      "pending",
      now,
      now
    );

    await this.appointmentRepo.create(appointment);
    return appointment;
  }
}