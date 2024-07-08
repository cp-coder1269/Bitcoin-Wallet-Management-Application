import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" py={2} bgcolor="grey.200" textAlign="center">
      <Typography variant="body2">© 2023 CompanyName. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
