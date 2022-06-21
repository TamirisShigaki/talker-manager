module.exports = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({
                message: 'Token não encontrado',
            });
        }
        if (authorization.length !== 16) {
            return res.status(400).json({
                message: 'Token inválido',
            });
        }

        return next();
    } catch (error) {
        return res.status(500).end();
    }
};