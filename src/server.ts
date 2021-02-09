import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import uploadConfig from './config/aupload';

import './database';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.get('/teste', (req, res) => {
  return res.json({ resp: 'olaa'});
})

app.listen(3333, () => {
  console.log('Server started on port 3333 ✌');
});
