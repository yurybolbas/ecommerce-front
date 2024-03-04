import HOST from './base_url'

export const sendOrder = async (placeOrder) => {
	const response = await fetch(`http://${HOST}:80/api/order/public/v1/place-order`, {
		mode: 'cors',
		referrerPolicy: "unsafe-url",
		method: 'POST',
	 	headers: {"Content-Type": "application/json"},
	 	body: JSON.stringify(placeOrder)
		});
	
	if (!response.ok) {
			throw new Error('Order has not been placed.');
	}

	return (await response.text()).replace(/^"(.*)"$/, '$1');
};
