// Requisito 8 

const utils = require('../fs-utils');

module.exports = async (req, res, next) => {
  const { q } = req.query;

  if (!q || q === '') {
    const talkers = await utils.getTalker();
    return res.status(200).json(talkers);
  }
  next();
};