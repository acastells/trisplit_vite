module.exports = (req, res, next) => {
	trisplitMiddleware(req, res, next);
};

const trisplitMiddleware = (req, res, next) => {
	next();
};
