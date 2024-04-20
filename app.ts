
import "reflect-metadata";
import { fastify } from 'fastify';
import pino from 'pino';
import quotesRoutes from './routes/quotes.route';
import setupProviders from "./providers";
import logger from "./utils/logger";


async function startServer() {
  await setupProviders();
  const server = fastify({
      logger: pino({ level: 'info' })
  });


  server.setErrorHandler(function (error, request, reply) {
    if (error.validation) {
      const message = error.validation.map(e => `${e.instancePath} ${e.message}`).join(', ');
      reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: "Validation failed: " + message
      });
    } else {
      reply.send(error);
    }
  });

  server.register(quotesRoutes);

  server.listen({ port: 3000 }, (err, address) => {
      if (err) {
        logger.error(err)
        process.exit(1)
      }
      logger.info(`Server listening at ${address}`)
  })

}
startServer();