import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { clearCart } from './../../store/cartSlice';
import { postOrder, setOrderNumber } from './../../store/orderSlice';


function Checkout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cartItems = useSelector((state) => state.cart.items);
	const totalQuantity = cartItems.reduce((total, item) => total + item.quantityToOrder, 0);

  const calculateTotalSum = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantityToOrder, 0);
  };

	const formatPrice = (price) => {
		return price.toFixed(2);
	};

	// State for Shipment Info form
	const [shipmentInfo, setShipmentInfo] = useState({
		userEmail: '',
		firstName: '',
		lastName: '',
		address: '',
		address2: '',
		city: '',
		postalCode: '',
		country: '',
	});

	// Extracting id and quantityToOrder for each cartItem
	const itemsInfo = cartItems.map((item) => ({
		productId: item.id,
		quantity: item.quantityToOrder,
	}));

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setShipmentInfo((prevInfo) => ({
			...prevInfo,
			[name]: value,
		}));
	};

	
	const handleConfirmOrder = () => {
		const placeOrder = { 
			"userEmail": shipmentInfo.userEmail, 
			"firstName": shipmentInfo.firstName,
			"lastName": shipmentInfo.lastName,
			"address": { 
				"addressLine1": shipmentInfo.address, 
				"addressLine2": shipmentInfo.address2, 
				"city": shipmentInfo.city, 
				"country": shipmentInfo.country, 
				"postalCode": shipmentInfo.postalCode,
			}, 
			"items": itemsInfo 
		}
		// console.log(placeOrder);
		// Handle the logic for confirming the order with shipmentInfo
		// console.log('Shipment Info:', shipmentInfo);
		// console.log('Cart Items:', itemsInfo);
		dispatch(postOrder(placeOrder)).then((data) => {
			// console.log(data);
			dispatch(setOrderNumber(data));
			navigate('/orderconfirmation');
			dispatch(clearCart());
		});
	};

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
					<Typography color="text.primary">Checkout</Typography>
				</Breadcrumbs>
				<Typography variant='h4' component="h1">Checkout</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 1 }}>
					<div>
						<Typography variant="h6" component="div" textAlign='right'>Total items: {totalQuantity}</Typography>
						<Typography variant="h6" component="div" textAlign='right'>Total Sum: ${formatPrice(calculateTotalSum())}</Typography>
					</div>
				</Box>
				<Typography variant='h5' component="h2" mb={2}>Shipment Info</Typography>
				
				<Box component="form" aria-label='Shipment Info' autoComplete="off">
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth>
								<TextField
									required
									label="First Name"
									id="firstName"
									name="firstName"
									variant="standard"
									value={shipmentInfo.firstName}
									onChange={handleInputChange}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth>
								<TextField
									required
									label="Last Name"
									id="lastName"
									name="lastName"
									variant="standard"
									value={shipmentInfo.lastName}
									onChange={handleInputChange}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth>
								<TextField
									required
									label="Email"
									id="email"
									name="userEmail"
									type="email"
									variant="standard"
									value={shipmentInfo.userEmail}
									onChange={handleInputChange}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth>
								<TextField
									required
									label="Address"
									id="address"
									name="address"
									variant="standard"
									value={shipmentInfo.address}
									onChange={handleInputChange}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth>
								<TextField
									label="Address 2"
									id="address2"
									name="address2"
									variant="standard"
									value={shipmentInfo.address2}
									onChange={handleInputChange}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth>
								<TextField
									required
									label="City"
									id="city"
									name="city"
									variant="standard"
									value={shipmentInfo.city}
									onChange={handleInputChange}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth>
								<TextField
									required
									label="Postal Code"
									id="postalCode"
									name="postalCode"
									variant="standard"
									value={shipmentInfo.postalCode}
									onChange={handleInputChange}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth>
								<TextField
									select
									required
									label="Country"
									id="country"
									name="country"
									value={shipmentInfo.country}
									onChange={handleInputChange}
									variant="standard"
									SelectProps={{
										native: true,
									}}
								>
									<option value=""></option>
									<option value="poland">Poland</option>
									<option value="usa">USA</option>
									<option value="canada">Canada</option>
								</TextField>
							</FormControl>
						</Grid>
					</Grid>

					<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
						<Button
							component={Link}
							size="large"
							variant="outlined"
							color="primary"
							to="/cart"
							sx={{ mr: 1 }}
						>
							Back to Cart
						</Button>
						<Button
							component={Link}
							size="large"
							variant="contained"
							color="primary"
							to={'/orderconfirmation'}
							onClick={handleConfirmOrder}
						>
							Confirm Order
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default Checkout;

