const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const utils = require('./fs-utils');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const authMiddleware = require('./middlewares/authMiddleware');
const validateAge = require('./middlewares/validateAge');
const validateName = require('./middlewares/validateName');
const validateRate = require('./middlewares/validateRate');
const validateTalk = require('./middlewares/validateTalk');
const validateWatchedAt = require('./middlewares/validateWatchedAt');

const app = express();
app.use(bodyParser.json());
const HTTP_OK_STATUS = 200;
const PORT = '3000';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1
app.get('/talker', async (_req, res) => {
  try {
    const talkers = await utils.getTalker();
    return res.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
});

// Requisito 2
app.get('/talker/:id', async (req, res) => {
  const talkers = await utils.getTalker();
  const talker = talkers.find(({ id }) => id === Number(req.params.id));
  
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
      return res.status(HTTP_OK_STATUS).json(talker);
});

// Requisito 3 e 4
app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = { token: `${crypto.randomBytes(8).toString('hex')}` };

  res.status(HTTP_OK_STATUS).json(token);
});

// Requsiito 5
app.use(authMiddleware);

app.post('/talker',
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res, next) => {
  try {
    const { name, age, talk } = req.body;
    const talkers = await utils.getTalker();
    const id = talkers.length + 1;
    const newTalker = { id, name, age, talk };
    const newFile = [...talkers, newTalker];
  
    await utils.setTalker(newFile);
    
    return res.status(201).json(newTalker);
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});