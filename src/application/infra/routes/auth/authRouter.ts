import { loginAdapter,signupAdapter } from "./authAdapter";
import { loginPostSchema,signupPostSchema } from "./authSchema";

async function auth(fastify: any, options: any) {
  fastify.post("/auth/signup", signupPostSchema, signupAdapter());
  fastify.post("/auth/login", loginPostSchema, loginAdapter());

}
export { auth };