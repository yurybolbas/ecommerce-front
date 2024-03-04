import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { setSelectedCategory, setCategories } from './../../store/categorySlice';
import { getProductDataById } from './../../store/productData';
import { getCategoriesList } from '../../store/categoriesList';
import { addToCart } from './../../store/cartSlice';
import notfound from '../../static/images/404-image.png';

function Product() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [productData, setProductData] = useState(null);
	const [error, setError] = useState(null);
	const selectedCategory = useSelector((state) => state.category.selectedCategory);
	const categories = useSelector((state) => state.category.categories);
	const [quantityToAdd, setQuantityToAdd] = useState(1);
	const formatPrice = (price) => {
		return price.toFixed(2);
	};

	const handleCategoryClick = (category) => {
		dispatch(setSelectedCategory(category));
	};

	const handleAddToCart = () => {
		// Create an object with product info
		const cartItem = {
			id: productData.id,
			name: productData.name,
			price: productData.price,
			available: productData.quantity,
			imageUrl: productData.imageUrl,
			quantityToOrder: parseInt(quantityToAdd, 10),
		};
		console.log(cartItem);
		dispatch(addToCart(cartItem));
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getProductDataById(id);
				setProductData(data);

				// Begin: get categories list and selected category for case of page refresh or open direct link to product
				const dataCategories = await getCategoriesList();
				dispatch(setCategories(dataCategories));

				const parentCategoryId = data.categoryId; //TODO: rename parentCategoryId to categoryId
				
				const restoredSelectedCategory = dataCategories.find(category => 
					category.childCategories.find(childCategory => childCategory.id === parentCategoryId)
				);
				dispatch(setSelectedCategory(restoredSelectedCategory));
				// End: get categories list and selected category for case of page refresh or open direct link to product
			} catch (error) {
				console.error('Error fetching product data:', error);
				setError(error.message);
			}
		};
		
		fetchData();
	}, [dispatch, id]);
	
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
			<List 
				sx={{
					flexGrow: 0,
					flexShrink: 0,
					flexBasis: '200px'
				}}
			>
				{categories.map((category) => (
					<ListItem key={category.id}>
						<Button component={Link} to={`/category/${category.id}`} onClick={() => handleCategoryClick(category)} style={{fontWeight: category.id === selectedCategory?.id ? 'bold' : 'normal',
				}}>
							{category.name}
						</Button>
					</ListItem>
				))}
			</List>
			<Box sx={{ px: 3, py: 3, flexBasis: '100%' }}>
				{error && <p>Error: {error}</p>}
				{productData && (
					<>
						<Breadcrumbs sx={{mb: 1}} separator="›" aria-label="breadcrumb">
							<Link underline="hover" color="inherit" to="/">
								Home
							</Link>
							<Link underline="hover" color="inherit" to={`/category/${selectedCategory?.id}`}>
								{selectedCategory?.name}
							</Link>
							<Typography color="text.primary">{productData.name}</Typography>
						</Breadcrumbs>
						<Typography variant='h4' component="h1">
							{productData.name}
						</Typography>
						<Grid container spacing={4} mt={-2}>
							<Grid item xs={12} sm={12} md={4}>
								<Box
										component="img"
										sx={{
											width: '100%',
											marginTop: 1,
											border: '1px solid rgba(0, 0, 0, 0.12)',
										}}
										alt={productData.name}
										src={productData.imageUrl}
										onError={addDefaultSrc}
									/>
							</Grid>
							<Grid item xs={12} sm={12} md={8}>
								<Typography variant='h5' component="p" mb={1}>Price: {formatPrice(productData.price)} PLN</Typography>
								<Typography variant='p' component="p" mb={1}>SKU: {productData.sku}</Typography>
								<Typography variant='h5' component="h6">Description</Typography>
								<Typography variant='p' component="p" mb={1}>{productData.description}</Typography>
								<Typography variant="h5" component="h6">Specification</Typography>
								<Table sx={{mb: 4}}>
									<TableBody>
									{Object.entries(productData.specification).map(([key, value]) => (
										<TableRow key={key}>
											<TableCell variant="th" component="th">{key}</TableCell>
											<TableCell>{value}</TableCell>
										</TableRow>
									))}
									</TableBody>
								</Table>
								<Box display="flex" justifyContent="flex-end">
									<Box display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="center" gap={2}>
										<FormControl sx={{ width: 100,}}>
											<TextField
												type="number"
												label="Add to cart"
												id="add-to-cart"
												variant="standard"
												value={quantityToAdd}
												onChange={(e) => setQuantityToAdd(Math.max(1, Math.min(productData.quantity, e.target.value)))}
											/>
										</FormControl>
										<Typography variant="p" component="div" alignSelf="center">
											from {productData.quantity} available
										</Typography>
										<Button
											size="large"
											variant="contained"
											color="primary"
											onClick={handleAddToCart}
										>
											Add to cart
										</Button>
									</Box>
								</Box>
							</Grid>
						</Grid>
					</>
				)}
			</Box>
		</Box>
	);
}

export default Product;

