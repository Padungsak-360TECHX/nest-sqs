import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';
// import { fromIni } from '@aws-sdk/credential-providers';
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { AppConfigService } from 'src/config/config.service';

@Injectable()
export class SqsConsumerService implements OnModuleInit {
  private readonly sqsClient: SQSClient;
  private readonly queueUrl: string;
  private readonly logger = new Logger(SqsConsumerService.name);

  constructor(private readonly configService: AppConfigService) {
    this.sqsClient = new SQSClient({
      region: this.configService.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: this.configService.AWS_ACCESS_KEY_ID,
        secretAccessKey: this.configService.AWS_SECRET_ACCESS_KEY,
        sessionToken: this.configService.AWS_SESSION_TOKEN,
      },
    });

    // this.sqsClient = new SQSClient({
    //   region: this.configService.AWS_DEFAULT_REGION,
    //   credentials: fromIni({
    //     profile: this.configService.AWS_PROFILE_NAME,
    //   }), // Switch to a specific profile
    // });

    this.queueUrl = this.configService.SQS_QUEUE_URL;
  }

  async onModuleInit() {
    this.pollMessages(); // Start polling messages when the module initializes
  }

  async pollMessages(): Promise<void> {
    this.logger.log('Starting to poll SQS messages...');
    while (true) {
      try {
        const receiveParams = {
          QueueUrl: this.queueUrl,
          MaxNumberOfMessages: 10,
          WaitTimeSeconds: 10, // Long polling
        };

        const command = new ReceiveMessageCommand(receiveParams);
        const response = await this.sqsClient.send(command);

        if (response.Messages && response.Messages.length > 0) {
          for (const message of response.Messages) {
            this.logger.log(`Received message: ${JSON.stringify(message)}`);
            await this.processMessage(message);

            if (message.ReceiptHandle) {
              await this.deleteMessage(message.ReceiptHandle);
            }
          }
        } else {
          this.logger.log('No messages received.');
        }
      } catch (error) {
        this.logger.error('Error receiving messages:', error);
      }
    }
  }

  private async processMessage(message: { Body?: string }) {
    if (message.Body) {
      this.logger.log(`Processing message: ${message.Body}`);
      // Add your message processing logic here
    }
  }

  private async deleteMessage(receiptHandle: string) {
    try {
      const deleteParams = {
        QueueUrl: this.queueUrl,
        ReceiptHandle: receiptHandle,
      };
      const command = new DeleteMessageCommand(deleteParams);
      await this.sqsClient.send(command);
      this.logger.log('Message deleted successfully.');
    } catch (error) {
      this.logger.error('Error deleting message:', error);
    }
  }
}
