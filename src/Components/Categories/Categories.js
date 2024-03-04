import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { setSelectedCategory, setCategories } from './../../store/categorySlice';
import { getCategoriesList } from '../../store/categoriesList';

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const selectedCategory = useSelector((state) => state.category.selectedCategory);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategoriesList();

        dispatch(setCategories(data));
        if (!selectedCategory) {
          dispatch(setSelectedCategory(data[0]));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch, selectedCategory]);


  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <Box
		sx={{
			flexGrow: 1,
			flexShrink: 1,
			flexBasis: '100%'
		}}
	>
		<Container sx={{ py: 8 }} maxWidth="xl">
			<Grid container spacing={4}>
				{categories.map((category) => (
					<Grid item key={category.id} xs={12} sm={6} md={4}>
						<Card variant="outlined">
							<Button component={Link} to={`/category/${category.id}`} onClick={() => handleCategoryClick(category)} variant="h5"
								sx={{ 
									px: '20px',
									py: '40px',
									width: '100%',
									height: '100%',
								}}
							>
								{category.name}
							</Button>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
    </Box>
  );
}

export default Categories;
