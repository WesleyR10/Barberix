import "./application/infra/config/module-alias";

import Fastify, { FastifyInstance } from "fastify";

import { env, routes } from "@/application/infra";


const fastify: FastifyInstance = Fastify({ logger: true });

// Run the server!
const start = async () => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mongo = await fastify.register(require("@fastify/mongodb"), {
            // force to close the mongodb connection when app stopped
            // the default value is false
            forceClose: true,
            url: env.DATABASE_URL,
        });

        console.log(mongo);
        for (const route of routes) { // percorre todas as rotas do array routes
            fastify.register(route);
        }

        const port = env.PORT ?? 3000;
        await fastify.listen({ port, host: "0.0.0.0" });
        fastify.log.info(`server listening on ${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();