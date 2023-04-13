const { withCors } = require('../utils/withCors');
const formidable = require('formidable');

const getExistedSubscribers = () => {
	return [{ email: 'exist@gmail.com' }, { email: 'sdf@sdf.sdf' }];
};

/**
 * @param {import("@vercel/node").VercelRequest} request
 * @param {import("@vercel/node").VercelResponse} response
 * @return {import("@vercel/node").VercelResponse}
 */
const handler = async (request, response) => {
	if (request.method !== 'POST') {
		return response.status(405).json({
			message: `Метод ${request.method} не підтримується! Використовуйте метод POST`,
		});
	}

	const form = formidable();
	const fields = await new Promise((resolve, reject) => {
		form.parse(request, (err, fields) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(fields);
		});
	}).catch((err) => {
		console.error(err);
	});

	const email = fields.email;
	if (!email) {
		return response.json({
			success: false,
			message: `Пошта не була вказана! Вкажіть поле "email"`,
		});
	}

	const existedSubscribers = getExistedSubscribers();
	const isExisted = existedSubscribers.some(
		(subscriber) => subscriber.email === email
	);

	if (isExisted) {
		return response.json({
			success: false,
			message: `Пошта "${email}" вже була додана до списку підписників раніше! Вкажіть іншу пошту`,
		});
	} else {
		// save email to database ...
		// send email to admin ...
		// send message to user
		return response.json({
			success: true,
			message: `Дякуємо за підписку!`,
		});
	}
};

module.exports = withCors(handler);
