export interface MessagingService {
  publishToSns(topicArn: string, message: any): Promise<void>;
  sendToSqs(queueUrl: string, message: any): Promise<void>;
  publishToEventBridge(event: any): Promise<void>;
}
