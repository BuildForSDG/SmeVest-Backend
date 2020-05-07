/* eslint-disable no-console */
import Chalk from 'chalk';
import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`
        ${Chalk.blue(`💚 Project running on http://localhost:${port}`)}
  `);
});
