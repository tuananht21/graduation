import dotenv from 'dotenv';
dotenv.config();

const env = {
  PORT: process.env.PORT,
  MONGOOSE_URL: process.env.MONGOOSE_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
}

export default env;
// 