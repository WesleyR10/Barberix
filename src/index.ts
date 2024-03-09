import "./application/infra/config/module-alias";

import Fastify, { FastifyInstance } from "fastify";

import { env, routes } from "@/application/infra";
const fastify: FastifyInstance = Fastify({ logger: true });

const start = async () => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        await fastify.register(require("@fastify/mongodb"), {
            forceClose: true,
            url: env.MONGO_URL,
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