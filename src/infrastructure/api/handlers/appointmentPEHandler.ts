import { SQSEvent } from "aws-lambda";
import { RdsAppointmentCountryRepositoryPE } from "../../db/RdsAppointmentCountryRepositoryPE";
import { Appointment } from "../../../domain/entities/Appointment";
import { AwsMessagingService } from "../../messaging/AwsMessagingService";

const repo = new RdsAppointmentCountryRepositoryPE();
const messaging = new AwsMessagingService();

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {

    const snsEnvelope = JSON.parse(record.body);
    const appointment: Appointment = JSON.parse(snsEnvelope.Message);
    await repo.saveCountryAppointment(appointment);

    await messaging.publishToEventBridge({
      appointmentId: appointment.id,
      status: "completed",
      countryISO: appointment.countryISO
    }, process.env.EVENT_BUS_NAME!);
  }
};
