const { allowCors } = require('../utils/allowCors');

const getExistedSubscribers = () => {
	return [{ email: 'exist@gmail.com' }, { email: 'sdf@sdf.sdf' }];
};

/**
 * @param {import('@vercel/node').VercelRequest} request
 * @param {import('@vercel/node').VercelResponse} response
 * @return {import('@vercel/node').VercelResponse}
 */
const handler = async (request, response) => {
	if (request.method !== 'POST') {
		return response.status(405).json({
			message: `Метод ${request.method} не підтримується! Використовуйте метод POST`,
		});
	}

	const email = request.body.email;
	if (!email) {
		response.statusCode = 400;
		response.statusMessage = `Пошта не була вказана! Вкажіть пошту`;
		return response.end();
	}

	const existedSubscribers = getExistedSubscribers();
	const isExisted = existedSubscribers.some(
		(subscriber) => subscriber.email === email
	);

	if (isExisted) {
		response.statusCode = 400;
		response.statusMessage = `Пошта "${email}" вже була додана до списку підписників раніше! Вкажіть іншу пошту`;
		return response.end();
	} else {
		// save email to database ...
		// send email to admin ...
		// send message to user
		return response.json({ message: `Дякуємо за підписку!` });
	}
};

module.exports = allowCors(handler);
