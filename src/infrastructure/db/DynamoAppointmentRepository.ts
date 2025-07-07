import { Appointment, AppointmentStatus } from "../../domain/entities/Appointment";
import { AppointmentRepository } from "../../domain/repositories/AppointmentRepository";
import { DynamoDBClient, PutItemCommand, UpdateItemCommand, QueryCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

export class DynamoAppointmentRepository implements AppointmentRepository {

  private client: DynamoDBClient;
  private tableName: string;

  constructor() {
    this.client = new DynamoDBClient({ region: "us-east-1" });
    this.tableName = process.env.APPOINTMENT_TABLE || "Appointments";
  }

  async create(appointment: Appointment): Promise<void> {
    await this.client.send(new PutItemCommand({
      TableName: this.tableName,
      Item: {
        id: { S: appointment.id },
        insuredId: { S: appointment.insuredId },
        scheduleID: { N: appointment.scheduleId.toString() },
        countryISO: { S: appointment.countryISO },
        status: { S: appointment.status },
        createdAt: { S: appointment.createdAt.toISOString() },
        updatedAt: { S: appointment.updatedAt.toISOString() }
      }
    }));
  }

  async updateStatus(id: string, status: AppointmentStatus): Promise<void> {
    await this.client.send(new UpdateItemCommand({
      TableName: this.tableName,
      Key: { id: { S: id } },
      UpdateExpression: "set #status = :status, updatedAt = :updatedAt",
      ExpressionAttributeNames: { "#status": "status" },
      ExpressionAttributeValues: {
        ":status": { S: status },
        ":updatedAt": { S: new Date().toISOString() }
      }
    }));
  }

  async findByInsuredId(insuredId: string): Promise<Appointment[]> {
    const result = await this.client.send(new QueryCommand({
      TableName: this.tableName,
      IndexName: "insuredId-index",
      KeyConditionExpression: "insuredId = :insuredId",
      ExpressionAttributeValues: { ":insuredId": { S: insuredId } }
    }));
    return (result.Items || []).map(item => new Appointment(
      item.id.S!,
      item.insuredId.S!,
      Number(item.scheduleID.N),
      item.countryISO.S! as "PE" | "CL",
      item.status.S! as AppointmentStatus,
      new Date(item.createdAt.S!),
      new Date(item.updatedAt.S!)
    ));
  }

  async findById(id: string): Promise<Appointment | null> {
    const result = await this.client.send(new GetItemCommand({
      TableName: this.tableName,
      Key: { id: { S: id } }
    }));
    if (!result.Item) return null;
    const item = result.Item;
    return new Appointment(
      item.id.S!,
      item.insuredId.S!,
      Number(item.scheduleID.N),
      item.countryISO.S! as "PE" | "CL",
      item.status.S! as AppointmentStatus,
      new Date(item.createdAt.S!),
      new Date(item.updatedAt.S!)
    );
  }

}