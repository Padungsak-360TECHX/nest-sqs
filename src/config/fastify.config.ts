import { FastifyServerOptions } from 'fastify';
// import { AppConfigService } from './config.service';

// export const getFastifyConfig = (configService: AppConfigService) => ({
//   logger: {
//     level: configService.FASTIFY_LOG_LEVEL,
//   },
//   bodyLimit: configService.FASTIFY_BODY_LIMIT,
//   trustProxy: configService.FASTIFY_TRUST_PROXY,
// });

export default (): FastifyServerOptions => ({
  logger: {
    level: process.env.FASTIFY_LOG_LEVEL || 'info', // Logging level (e.g., 'info', 'error', 'debug')
  },
  bodyLimit: parseInt(process.env.FASTIFY_BODY_LIMIT || '1048576', 10), // Max request body size in bytes (default: 1MB)
  trustProxy: process.env.FASTIFY_TRUST_PROXY === 'true', // Enable if behind a reverse proxy
});
