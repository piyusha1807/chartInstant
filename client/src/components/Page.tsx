import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import React, { forwardRef } from 'react';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', dMeta = '', kMeta = '', ...other }: any, ref) => (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={dMeta} />
      <meta name="keywords" content={kMeta} />
    </Helmet>
    {children}
  </Box>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
