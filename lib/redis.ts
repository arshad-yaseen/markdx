import { env } from "@/env.mjs";
import { Redis } from "ioredis";

export const redis = new Redis(env.REDIS_URL)