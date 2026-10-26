import express from 'express';
import env from './config/environment.js'
import cors from 'cors';
import path from 'path';

const app = express();
const port = env.PORT;

// cors
app.use(cors({
  origin: env.CORS_ORIGIN,
}));

// set response json 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set static folder public
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, './public')));

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});