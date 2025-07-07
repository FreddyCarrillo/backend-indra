import { SQSEvent } from "aws-lambda";
import { DynamoAppointmentRepository } from "../../db/DynamoAppointmentRepository";

const appointmentRepo = new DynamoAppointmentRepository();

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const { appointmentId } = JSON.parse(record.body);
    await appointmentRepo.updateStatus(appointmentId, "completed");
  }
};
