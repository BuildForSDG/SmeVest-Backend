import Chalk from 'chalk';
import mongoose from 'mongoose';
import config from '../config';

class Database {
  constructor() {
    this.dbConnect();
  }

  dbConnect() {
    mongoose.connect(config.databaseUrl[config.environment],
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log(Chalk.yellow('Database connection successful'));
      })
      .catch(() => {
        console.error(Chalk.red('Database connection error'));
      });
  }
}

export default new Database();
