import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // const configService = app.get(AppConfigService);
  // const fastifyAdapter = new FastifyAdapter(fastifyConfig());
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        level: process.env.FASTIFY_LOG_LEVEL || 'info', // Logging level (e.g., 'info', 'error', 'debug')
      },
      bodyLimit: parseInt(process.env.FASTIFY_BODY_LIMIT || '1048576', 10), // Max request body size in bytes (default: 1MB)
      trustProxy: process.env.FASTIFY_TRUST_PROXY === 'true', // Enable if behind a reverse proxy
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Nest SQS example')
    .setDescription('The Nest SQS API description')
    .setVersion('1.0')
    .addTag('nest')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Serve static assets
  const fastifyAdapter = app.getHttpAdapter();
  fastifyAdapter.useStaticAssets({
    root: join(__dirname, '..', 'public'), // Directory to serve static files from
    prefix: '/static/', // Optional: URL prefix for static files
  });

  // await fastify.register(import('@fastify/compress'), { global: false });
  // // eslint-disable-next-line @typescript-eslint/no-require-imports
  // // app.register(require('@fastify/compress'), { global: true });

  // // eslint-disable-next-line @typescript-eslint/no-require-imports
  // await fastify.register(import('@fastify/cors'), {
  //   origin: true,
  //   credentials: true,
  // });

  // app.register(require('@fastify/cors'), {
  //   origin: true,
  //   credentials: true,
  // });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
