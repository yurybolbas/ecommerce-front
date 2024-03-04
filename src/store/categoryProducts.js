import HOST from './base_url'

export const getProductsList = async (categoryId) => {
	const response = await fetch(`http://${HOST}:80/api/product/products/v1/pc/${categoryId}?page=1`);

	if (!response.ok) {
			return [];
	}
	const json = await response.json();
	if (json.length !== 0) {
		// console.log(json);

		json.sort((a, b) => a["id"] - b["id"]);
	}
	return json;
};
