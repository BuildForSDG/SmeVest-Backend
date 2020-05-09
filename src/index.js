import Chalk from 'chalk';
import app from './app';
import config from './config';

app.listen(config.port, () => {
  console.log(`
        ${Chalk.blue(`💚 Project running on http://localhost:${config.port}`)}
  `);
});
