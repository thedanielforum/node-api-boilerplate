import { Router } from 'express';
import hello from '../controllers/hello';

const router = new Router();

/*
 * Register routes.
 */
router.get('/', (req, res) => res.send('Hello World!'));

// hello
router.get('/hello', hello.get);

export default router;
