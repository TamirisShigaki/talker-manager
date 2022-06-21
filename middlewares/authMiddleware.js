// Requisito 5

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(400).json({
            message: 'Token não encontrado',
        });
    }
    if (authorization.length < 16) {
        return res.status(400).json({
            message: 'Token inválido',
        });
    }

    next();
};