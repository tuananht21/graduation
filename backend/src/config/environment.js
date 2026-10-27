import dotenv from 'dotenv';
dotenv.config();

const env = {
  // mongodb
  MONGOOSE_URL: process.env.MONGOOSE_URL,
  // system
  PORT: process.env.PORT,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  // jwt
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  // redis
  REDIS_URL: process.env.REDIS_URL,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_REFRESH_EXPIRES_IN: process.env.REDIS_REFRESH_EXPIRES_IN,
  // mailer
  MAIL_MAILER: process.env.MAIL_MAILER,
  MAIL_SCHEME: process.env.MAIL_SCHEME,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
  MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
}

export default env;