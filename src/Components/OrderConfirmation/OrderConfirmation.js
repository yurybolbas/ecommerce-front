import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { clearOrderNumber } from './../../store/orderSlice';

function OrderConfirmation() {
	const dispatch = useDispatch();
	const orderNumber = useSelector((state) => state.order?.orderNumber);
	// Use useRef to store orderNumber inside the component
  const orderNumberRef = useRef(orderNumber);

	// Update orderNumberRef in useRef when orderNumber is changed from Redux
  useEffect(() => {
    orderNumberRef.current = orderNumber;
  }, [orderNumber]);

	useEffect(() => {
		return () => {
			// clear orderNumber after it was stored in useRef
			dispatch(clearOrderNumber());
		};
	}, [dispatch]);

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
					<Typography color="text.primary">Order Confirmation</Typography>
				</Breadcrumbs>
				<Typography variant='h4' component="h1">Order Confirmation</Typography>
				<Typography variant='p' component="p" my={2}>Your order number is <strong>{orderNumberRef.current}</strong>.</Typography>
				<Typography variant='p' component="p" my={2}>You will be notified about changing the order status by email.</Typography>
				<Button
					component={Link}
					size="large"
					variant="outlined"
					color="primary"
					to="/"
					sx={{ mr: 1 }}
				>
					Return to Shopping
				</Button>
			</Box>
		</Box>
	);
}

export default OrderConfirmation;

