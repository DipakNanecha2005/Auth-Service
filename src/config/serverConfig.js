import "dotenv/config";

export const { PORT, NODE_ENV, JWT_KEY } = process.env;

const { SYNC_DB: SYNC_DB_STRING } = process.env;
export const SYNC_DB = SYNC_DB_STRING === "true";