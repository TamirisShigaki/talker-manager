module.exports = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
         return res.status(401).json({
                message: 'O campo "name" é obrigatório',
        });
    }

    if (name.length < 3) {
        return res.status(401).json({
                message: 'O "name" deve ter pelo menos 3 caracteres',
        });
    }

    next();
};