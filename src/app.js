import express from 'express';
import cors from 'cors';
import config from './config';
import v1Router from './routes/v1';
import './db';

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Base Route Response
app.get('/', (req, res) => res.json({ status: res.statusCode, message: 'Welcome to SmeVest server' }));

app.use('/api/v1/', v1Router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!config.production) {
  app.use((err, req, res) => {
    res.status(err.status || 500).json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

export default app;
