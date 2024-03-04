import HOST from './base_url'

export const getProductDataById = async (productId) => {
	const response = await fetch(`http://${HOST}:80/api/product/products/v1/p/${productId}`);

	if (!response.ok) {
			throw new Error(`Product with id ${productId} not found`);
	}

	return await response.json();
};
