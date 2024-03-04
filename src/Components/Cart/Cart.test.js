import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './../../store/store';
import Cart from './Cart';
import { addToCart } from './../../store/cartSlice';

test('renders empty cart messsage', () => {
	render(
		<Router>
			<Provider store={store}>
				<Cart />
			</Provider>
		</Router>
	);
	screen.debug();
	const emptyCartMessage = screen.getByTestId('empty-cart-message');
	expect(emptyCartMessage).toBeInTheDocument();
});

test('product is added to the cart', () => {
	const cartItem1 = {
		id: '0614dc43-9c86-44ed-b812-83296d486682',
		name: 'Razer Ornata V2',
		price: 299.00,
		available: 84,
		imageUrl: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/7/pr_2020_7_2_11_27_43_584_00.jpg',
		quantityToOrder: 1,
	};
	const cartItem2 = {
		id: '71a1c028-34e5-4d75-945e-42d25342d023',
		name: 'Lenovo Tab M8 3GB/32GB/Android 12/WiFi Gen. 4',
		price: 399.00,
		available: 91,
		imageUrl: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/3/pr_2023_3_14_11_0_15_443_00.jpg',
		quantityToOrder: 1,
	};
	store.dispatch(addToCart(cartItem1));
	store.dispatch(addToCart(cartItem2));
	render(
		<Router>
			<Provider store={store}>
				<Cart />
			</Provider>
		</Router>
	);
	screen.debug();
	const itemInCart = screen.getByText('Razer Ornata V2');
	expect(itemInCart).toBeInTheDocument();
});

test('remove product from the cart', () => {
	const cartItem1 = {
		id: '0614dc43-9c86-44ed-b812-83296d486682',
		name: 'Razer Ornata V2',
		price: 299.00,
		available: 84,
		imageUrl: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/7/pr_2020_7_2_11_27_43_584_00.jpg',
		quantityToOrder: 1,
	};
	const cartItem2 = {
		id: '71a1c028-34e5-4d75-945e-42d25342d023',
		name: 'Lenovo Tab M8 3GB/32GB/Android 12/WiFi Gen. 4',
		price: 399.00,
		available: 91,
		imageUrl: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/3/pr_2023_3_14_11_0_15_443_00.jpg',
		quantityToOrder: 1,
	};
	store.dispatch(addToCart(cartItem1));
	store.dispatch(addToCart(cartItem2));
	render(
		<Router>
			<Provider store={store}>
				<Cart />
			</Provider>
		</Router>
	);
	const itemNotInCart = screen.getByText('Razer Ornata V2');
	fireEvent.click(
		screen.getByTestId('remove-0614dc43-9c86-44ed-b812-83296d486682')
	);
	screen.debug();
	expect(itemNotInCart).not.toBeInTheDocument();
});

test('clear the cart', () => {
	const cartItem1 = {
		id: '0614dc43-9c86-44ed-b812-83296d486682',
		name: 'Razer Ornata V2',
		price: 299.00,
		available: 84,
		imageUrl: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/7/pr_2020_7_2_11_27_43_584_00.jpg',
		quantityToOrder: 1,
	};
	const cartItem2 = {
		id: '71a1c028-34e5-4d75-945e-42d25342d023',
		name: 'Lenovo Tab M8 3GB/32GB/Android 12/WiFi Gen. 4',
		price: 399.00,
		available: 91,
		imageUrl: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/3/pr_2023_3_14_11_0_15_443_00.jpg',
		quantityToOrder: 1,
	};
	store.dispatch(addToCart(cartItem1));
	store.dispatch(addToCart(cartItem2));
	render(
		<Router>
			<Provider store={store}>
				<Cart />
			</Provider>
		</Router>
	);
	fireEvent.click(
		screen.getByTestId('clearCart')
	);
	screen.debug();
	const emptyCartMessage = screen.getByTestId('empty-cart-message');
	expect(emptyCartMessage).toBeInTheDocument();
});
