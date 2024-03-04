import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
	<Box maxWidth="100%" className="Footer"
		sx={{flexGrow: 0, p: 2}}
	>
		<Typography variant="body2" color="text.secondary" align="center">
			{'Copyright © '}My Market {new Date().getFullYear()}{'.'}
		</Typography>
	</Box>
  );
}

export default Footer;
