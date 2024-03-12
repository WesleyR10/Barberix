/* eslint-disable @typescript-eslint/no-var-requires */
import "./application/infra/config/module-alias";

import Fastify, { FastifyInstance } from "fastify";

import { env, MongoHelper,routes } from "@/application/infra";

const { fastifyRequestContextPlugin } = require("@fastify/request-context");
const fastify: FastifyInstance = Fastify({ logger: true });

const start = async () => {
  try {
    const client = await MongoHelper.connect(env.MONGO_URL);

    await fastify.register(require("@fastify/helmet"), {
      contentSecurityPolicy: false,
      global: true,
    });
    await fastify.register(require("@fastify/rate-limit"), {
      max: 15,
      timeWindow: "10 minutes",
    });
    await fastify.register(require("@fastify/under-pressure"), {
      maxEventLoopDelay: 1000,
      maxHeapUsedBytes: 100000000,
      maxRssBytes: 100000000,
      maxEventLoopUtilization: 0.98,
      message: "Estamos sobrecarregados!",
      retryAfter: 50,
    });

    await fastify.register(fastifyRequestContextPlugin, {
      hook: "onRequest",
      defaultStoreValues: {
        user: { insertedId: "system" },
      },
    });
        
    await fastify.register(require("@fastify/mongodb"), {
      forceClose: true,
      client,
    });

    for (const route of routes) {
      fastify.register(route);
    }
    const port: any = env.PORT ?? 3000;
    await fastify.listen({ port, host: "0.0.0.0" });
    fastify.log.info(`server listening on ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();