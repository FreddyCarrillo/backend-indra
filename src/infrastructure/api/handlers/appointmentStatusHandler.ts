import { SQSEvent } from "aws-lambda";
import { DynamoAppointmentRepository } from "../../db/DynamoAppointmentRepository";

const appointmentRepo = new DynamoAppointmentRepository();

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    
    const { detail } = JSON.parse(record.body);
    const { appointmentId } = detail;

    if (!appointmentId) {
      continue;
    }

    await appointmentRepo.updateStatus(appointmentId, "completed");
  }
};
