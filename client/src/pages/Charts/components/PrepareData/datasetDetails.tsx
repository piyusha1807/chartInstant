import { Stack, Typography } from '@mui/material';
import React from 'react';

const DatasetDetails = () => {
  return (
    <Stack spacing={1}>
      <Typography variant="h6">Dataset overview</Typography>
      <Stack direction="row" spacing={6}>
        <Typography variant="subtitle2">Total rows</Typography>
        <Typography variant="subtitle1">3,645</Typography>
      </Stack>
      <Stack direction="row" spacing={6}>
        <Typography variant="subtitle2">Columns</Typography>
        <Typography variant="subtitle1">12</Typography>
      </Stack>
      <Stack direction="row" spacing={6}>
        <Typography variant="subtitle2">Data types</Typography>
        <Typography variant="subtitle1">4</Typography>
      </Stack>
    </Stack>
  );
};

export default DatasetDetails;
