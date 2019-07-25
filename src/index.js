import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import errorHandler from 'errorhandler';
import bodyParser from 'body-parser';

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
const configured = dotenv.config({ path: '.env' });
if (configured.error) {
  console.log('There looks to be a configuration error somewhere, please check that you have a .env file in the root dir.');
  throw configured.error;
}

/**
 * Express configuration.
 */
const app = express();
app.server = http.createServer(app);

/**
 * Middleware.
 */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('common'));
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Security.
 */
app.disable('x-powered-by');

/**
 * Routes.
 */
app.get('/', (req, res) => res.send('Hello World!'));

/**
 * Error handler.
 */
if (process.env.NODE_ENV === 'development') {
  // Only use in development
  app.use(errorHandler());
} else {
  // Can be removed if needed.
  // Will return obscure error message by default for security reasons.
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('500 Server Error');
  });
}

/**
 * Server.
 */
app.listen(process.env.PORT, () => {
  console.log('API is running at http://localhost:%s in %s mode', process.env.PORT, app.get('env'));
});

export default app;
