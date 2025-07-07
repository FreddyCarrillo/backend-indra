import { env } from "../../config/env";
import { Appointment } from "../../domain/entities/Appointment";
import { AppointmentCountryRepository } from "../../domain/repositories/AppointmentCountryRepository";
import mysql from "mysql2/promise";

export class RdsAppointmentCountryRepositoryCL implements AppointmentCountryRepository {
  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: env.rds.CL.host,
      user: env.rds.CL.user,
      password: env.rds.CL.password,
      database: env.rds.CL.database,
      port: env.rds.CL.port
    });
  }

  async saveCountryAppointment(appointment: Appointment): Promise<void> {

    const createdAt = typeof appointment.createdAt === "string"
      ? new Date(appointment.createdAt)
      : appointment.createdAt;
    const updatedAt = typeof appointment.updatedAt === "string"
      ? new Date(appointment.updatedAt)
      : appointment.updatedAt;
      
    await this.pool.execute(
      `INSERT INTO appointments (id, insuredId, scheduleId, countryISO, status, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        appointment.id,
        appointment.insuredId,
        appointment.scheduleId,
        appointment.countryISO,
        appointment.status,
        createdAt.toISOString(),
        updatedAt.toISOString()
      ]
    );
  }
}
