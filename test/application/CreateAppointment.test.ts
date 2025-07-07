import { CreateAppointment } from "../../src/application/CreateAppointment";
import { AppointmentRepository } from "../../src/domain/repositories/AppointmentRepository";
import { Appointment } from "../../src/domain/entities/Appointment";

class InMemoryAppointmentRepo implements AppointmentRepository {
  private appointments: Appointment[] = [];
  async create(appointment: Appointment) { this.appointments.push(appointment); }
  async updateStatus() { /* ... */ }
  async findByInsuredId(insuredId: string) { return this.appointments.filter(a => a.insuredId === insuredId); }
  async findById(id: string) { return this.appointments.find(a => a.id === id) || null; }
}

describe("CreateAppointment", () => {
  it("crea un agendamiento válido", async () => {
    const repo = new InMemoryAppointmentRepo();
    const useCase = new CreateAppointment(repo);
    const appointment = await useCase.execute({ insuredId: "01234", scheduleId: 1, countryISO: "PE" });
    expect(appointment.insuredId).toBe("01234");
    expect(appointment.status).toBe("pending");
  });
});
