import { CachingModule } from './modules/caching/caching.module';
import { SqsModule } from './modules/sqs/sqs.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [CachingModule, SqsModule, AppConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
