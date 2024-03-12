import { z } from "zod";

export const envSchema = z.object({
    MONGO_URL: z.string().url().default("mongodb+srv://wesleyribas:mongodb@cluster0.u8alpsv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"),
    JWT_SECRET: z.string().default("secret"),
    JWT_REFRESH_SECRET: z.string().default("secret"),
    PORT: z.coerce.number().optional().default(3333),
    NODE_ENV: z.string().default("production"),
});

export type Env = z.infer<typeof envSchema>

export const env = envSchema.parse(process.env);
