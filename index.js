const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const utils = require('./fs-utils');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const authMiddleware = require('./middlewares/authMiddleware');
const validateName = require('./middlewares/validadeName');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validateWatchedAt = require('./middlewares/authMiddleware');
const validateRate = require('./middlewares/validateRate');

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

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = { token: `${crypto.randomBytes(8).toString('hex')}` };

  res.status(HTTP_OK_STATUS).json(token);
});

app.use(authMiddleware,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate);

app.post('/talker', async (req, res) => {
    const { name, age, talk } = req.body;
    const talkerManager = await utils.getTalker();
    const newId = talkerManager.length + 1;
    const newTalker = { name, age, id: newId, talk };

    talkerManager.push(newTalker);

    await utils.setTalker(talkerManager);

    res.status(201).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
