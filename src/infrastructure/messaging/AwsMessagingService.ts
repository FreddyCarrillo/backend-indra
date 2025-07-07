import {
  SNSClient,
  PublishCommand as SnsPublishCommand,
} from "@aws-sdk/client-sns";

import {
  SQSClient,
  SendMessageCommand as SqsSendMessageCommand,
} from "@aws-sdk/client-sqs";

import {
  EventBridgeClient,
  PutEventsCommand as EventBridgePutEventsCommand,
} from "@aws-sdk/client-eventbridge";

import { MessagingService } from "../../domain/services/MessagingService";

export class AwsMessagingService implements MessagingService {
  private sns = new SNSClient({ region: "us-east-1" });
  private sqs = new SQSClient({ region: "us-east-1" });
  private eventBridge = new EventBridgeClient({ region: "us-east-1" });

  async publishToSns(topicArn: string, message: any): Promise<void> {
    await this.sns.send(
      new SnsPublishCommand({
        TopicArn: topicArn,
        Message: JSON.stringify(message),
        MessageAttributes: {
          countryISO: {
            DataType: "String",
            StringValue: message.countryISO
          }
        }
      })
    );
  }

  async sendToSqs(queueUrl: string, message: any): Promise<void> {
    await this.sqs.send(
      new SqsSendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(message),
      })
    );
  }

  async publishToEventBridge(event: any, eventBusName?: string): Promise<void> {
    await this.eventBridge.send(
      new EventBridgePutEventsCommand({
        Entries: [
          {
            Source: "user-service",
            DetailType: "CustomEvent",
            Detail: JSON.stringify(event),
            EventBusName: eventBusName || "default",
          },
        ],
      })
    );
  }
}
