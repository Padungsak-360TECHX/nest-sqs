import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  private readonly envConfig: Record<string, string>;
  public readonly isProductionEnv: boolean;
  private readonly logger = new Logger(AppConfigService.name);

  constructor(private readonly configService: ConfigService) {
    this.isProductionEnv = process.env.NODE_ENV === 'production';
  }

  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }
  get AWS_DEFAULT_REGION(): string {
    return this.configService.get('AWS_DEFAULT_REGION');
  }
  get AWS_PROFILE_NAME(): string {
    return this.configService.get('AWS_PROFILE_NAME');
  }
  get AWS_ACCESS_KEY_ID(): string {
    return this.configService.get('AWS_ACCESS_KEY_ID');
  }
  get AWS_SECRET_ACCESS_KEY(): string {
    return this.configService.get('AWS_SECRET_ACCESS_KEY');
  }
  get AWS_SESSION_TOKEN(): string {
    return this.configService.get('AWS_SESSION_TOKEN');
  }
  get SQS_QUEUE_URL(): string {
    return this.configService.get('SQS_QUEUE_URL');
  }

  get FASTIFY_LOG_LEVEL(): string {
    return this.configService.get('FASTIFY_LOG_LEVEL');
  }

  get FASTIFY_BODY_LIMIT(): number {
    return this.configService.get('FASTIFY_BODY_LIMIT', 1048576);
  }

  get FASTIFY_TRUST_PROXY(): boolean {
    return this.configService.get('FASTIFY_TRUST_PROXY', false);
  }
}
