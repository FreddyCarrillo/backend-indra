import { SQSEvent } from "aws-lambda";
import { RdsAppointmentCountryRepositoryCL } from "../../db/RdsAppointmentCountryRepositoryCL";
import { Appointment } from "../../../domain/entities/Appointment";
import { AwsMessagingService } from "../../messaging/AwsMessagingService";

const repo = new RdsAppointmentCountryRepositoryCL();
const messaging = new AwsMessagingService();

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {

    const snsEnvelope = JSON.parse(record.body);
    const appointment: Appointment = JSON.parse(snsEnvelope.Message);
    await repo.saveCountryAppointment(appointment);

    const eventBridgePayload = {
      appointmentId: appointment.id,
      status: "completed",
      countryISO: appointment.countryISO
    };

    await messaging.publishToEventBridge(eventBridgePayload, process.env.EVENT_BUS_NAME!);
  }
};
