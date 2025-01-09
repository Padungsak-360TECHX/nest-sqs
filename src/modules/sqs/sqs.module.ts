import { Module } from '@nestjs/common';
import { SqsConsumerService } from './sqs-consumer.service';
import { AppConfigModule } from 'src/config/config.module';
import { SqsProducerService } from './sqs-producer.service';

@Module({
  imports: [AppConfigModule],
  controllers: [],
  providers: [SqsConsumerService, SqsProducerService],
})
export class SqsModule {}
