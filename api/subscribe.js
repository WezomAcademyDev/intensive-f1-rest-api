const allowCors = require('../utils/allowCors');

const getExistedSubscribers = () => {
	return [{ email: 'exist@gmail.com' }, { email: 'sdf@sdf.sdf' }];
};

/**
 * @param {import('@vercel/node').VercelRequest} request
 * @param {import('@vercel/node').VercelResponse} response
 * @return {import('@vercel/node').VercelResponse}
 */
const handler = async (request, response) => {
	const email = request.body.email;
	if (!email) {
		return response.status(400).json({
			message: `Пошта не була вказана! Вкажіть пошту`,
		});
	}

	const existedSubscribers = getExistedSubscribers();
	const isExisted = existedSubscribers.some(
		(subscriber) => subscriber.email === email
	);

	if (isExisted) {
		return response.status(400).json({
			message: `Пошта "${email}" вже була додана до списку підписників раніше! Вкажіть іншу пошту`,
		});
	} else {
		// save email to database ...
		// send email to admin ...
		// send message to user
		return response.json({ message: `Дякуємо за підписку!` });
	}
};

module.exports = allowCors(handler);
