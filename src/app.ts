import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import error from './middlewares/error.middleware';
import routes from './routes';
import doc from '../swagger.json';

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(doc));

app.use(error);

export default app;
