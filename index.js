const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const utils = require('./fs-utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  try {
    const talkers = await utils.getTalker();

    return res.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await utils.getTalker();
  const talker = talkers.find(({ id }) => id === Number(req.params.id));
  
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
      return res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', (_req, res) => {
  const token = { token: `${crypto.randomBytes(8).toString('hex')}` };

  res.status(HTTP_OK_STATUS).json(token);
});

app.listen(PORT, () => {
  console.log('Online');
});
