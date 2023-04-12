const getExistedSubscribers = () => {
	return [{ email: 'exist@gmail.com' }, { email: 'sdf@sdf.sdf' }];
};

/**
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
module.exports = function (request, response) {
	const email = request.body.email;
	if (!email) {
		response.status(400).json({
			message: `Пошта не була вказана! Вкажіть пошту`,
		});
		return;
	}

	const existedSubscribers = getExistedSubscribers();
	const isExisted = existedSubscribers.some(
		(subscriber) => subscriber.email === email
	);

	if (isExisted) {
		response.status(400).json({
			message: `Пошта "${email}" вже була додана до списку підписників раніше! Вкажіть іншу пошту`,
		});
	} else {
		// save email to database ...
		// send email to admin ...
		// send message to user
		response.json({ message: `Дякуємо за підписку!` });
	}
};
