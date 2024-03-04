import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearCart, updateCartItemQuantity, removeCartItem } from './../../store/cartSlice';
import notfound from '../../static/images/404-image.png';


function Cart() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cartItems = useSelector((state) => state.cart.items);

	const handleClearCart = () => {
    dispatch(clearCart());
  };
	const handleProductClick = (productId) => {
		navigate(`/product/${productId}`);
	};

	const handleUpdateQuantityInCart = (itemId, newQuantity) => {
    dispatch(updateCartItemQuantity({ itemId, newQuantity }));
  };

  const handleDeleteItemFromCart = (itemId) => {
    dispatch(removeCartItem(itemId));
  };

  const calculateTotalSum = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantityToOrder, 0);
  };

	const formatPrice = (price) => {
		return price.toFixed(2);
	};

	const addDefaultSrc = (event) => {
		event.target.src = notfound;
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexGrow: 1,
				flexShrink: 1,
				flexBasis: '100%'
			}}
		>
			<Box sx={{ px: 3, py: 3, flexBasis: '100%' }}>
				<Breadcrumbs sx={{mb: 1}} separator="›" aria-label="breadcrumb">
					<Link underline="hover" color="inherit" to="/">
						Home
					</Link>
					<Typography color="text.primary">Cart</Typography>
				</Breadcrumbs>
				<Typography variant='h4' component="h1">Cart</Typography>
				{cartItems.length === 0 ? (
					<Typography data-testid='empty-cart-message'>Your cart is empty</Typography>
				) : (
					<>
						<List data-testid='cart-container'>
							{cartItems.map((item) => (
								<ListItem key={item.id}
									display="flex"
									sx={{
										border: '1px solid rgba(0, 0, 0, 0.12)',
										marginBottom: 1,
										padding: 1,
										width: "100%",
										justifyContent: "space-between"
									}}
								>
									<Box display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="center" gap={2}>
										<Box
											component="img"
											sx={{
												width: '200px',
												maxWidth: '100%',
												border: '1px solid rgba(0, 0, 0, 0.12)',
											}}
											alt={item.name}
											src={item.imageUrl}
											onError={addDefaultSrc}
										/>
										<Box component="h2" sx={{padding: 1}}>
											<Button component={Link} onClick={() => handleProductClick(item.id)} to={`/product/${item.id}`}>{item.name}</Button>
										</Box>
									</Box>
									<Box display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="center" gap={2}>
										<Typography sx={{padding: 1}} variant="h5">{formatPrice(item.price)} PLN</Typography>
										<FormControl sx={{ width: 70,}}>
											<TextField
												type="number"
												label="quantity"
												id={`update-in-cart-${item.id}`}
												variant="standard"
												value={item.quantityToOrder}
												onChange={(e) => handleUpdateQuantityInCart(item.id, Math.max(1, Math.min(item.available, e.target.value)))}
											/>
										</FormControl>
										<Typography variant="p" component="div" alignSelf="center">
											from {item.available} available
										</Typography>
										<Button
											size="large"
											variant="outlined"
											color="primary"
											data-testid={`remove-${item.id}`}
											onClick={() => handleDeleteItemFromCart(item.id)}
										>
											<DeleteIcon sx={{ mr: 1 }} />Delete
										</Button>
									</Box>
								</ListItem>
							))}
						</List>
						<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 1 }}>
							<Typography variant="h6" component="div">Total Sum: {formatPrice(calculateTotalSum())} PLN</Typography>
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Button 
								size="large" 
								variant="outlined" 
								color="primary" 
								sx={{ mr: 1 }} 
								data-testid="clearCart"
								onClick={handleClearCart}>
								Clear Cart
							</Button>
							<Button component={Link} size="large" variant="contained" color="primary" to="/checkout">Proceed to Checkout</Button>
						</Box>
					</>
				)}
			</Box>
		</Box>
	);
}

export default Cart;

