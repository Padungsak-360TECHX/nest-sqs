import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      ignoreEnvFile: process.env.NODE_ENV == 'production',
    }),
  ],
  controllers: [],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
