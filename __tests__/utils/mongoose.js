import mongoose from 'mongoose';
import config from '../../src/config';

const connect = () => mongoose.connect(config.databaseUrl[config.environment],
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const disconnect = () => mongoose.connection.close();

export {
  disconnect,
  connect
};
