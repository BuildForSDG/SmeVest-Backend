import { config } from 'dotenv';

config();

export default {
  url: process.env.APP_URL || 'http://localhost:3000',
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',

  databaseUrl: {
    development:
            process.env.DEVELOPMENT_DATABASE_URL
            || 'mongodb://localhost:27017/smevestdb',
    production:
            process.env.PRODUCTION_DATABASE_URL
            || 'mongodb://localhost:27017/smevestdb_production',
    test:
            process.env.TEST_DATABASE_URL
            || 'mongodb://localhost:27017/smevestdb_test',
    staging:
            process.env.STAGING_DATABASE_URL
            || 'mongodb://localhost:27017/smevestdb_stagine'
  },
  sendGridSecret: process.env.SENDGRID_API_KEY,
  smtpMailUser: process.env.SMTP_MAIL_USER,
  smtpMailPassword: process.env.SMTP_MAIL_PASSWORD,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloud_api_key: process.env.CLOUDINARY_API_KEY,
  cloud_api_secret: process.env.CLOUDINARY_API_SECRET,
  jwtSecret: process.env.JWT_SECRET || 'YASYAS',
  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production',
  test: process.env.NODE_ENV === 'test',
  staging: process.env.NODE_ENV === 'staging'

};
