import React, { useState } from 'react';
import {
  Button,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import * as Plotly from 'plotly.js';
import Plot from 'react-plotly.js';
import { useNavigate } from 'react-router';

interface ChartNameProps {
  name: string;
  ext: 'jpeg' | 'png' | 'webp' | 'svg';
}

const ExportPublish = (props: any) => {
  const { data } = props;
  const { trace, layout, config } = data;
  const navigate = useNavigate();

  const plotId = 'plotString';

  const [chartName, setChartName] = useState<ChartNameProps>({
    name: 'chart',
    ext: 'svg',
  });

  const handleChartName = (value: any, type: string) => {
    setChartName({ ...chartName, [type]: value });
  };

  const handlSaveToOmero = () => {
    Plotly.downloadImage(plotId, {
      format: chartName.ext,
      width: layout.width,
      height: layout.height,
      filename: chartName.name,
    });
  };

  const handleBack = () => {
    navigate('/chart/new/config');
  };

  const handleNext = () => {
    navigate('/chart/new/upload');
  };

  return (
    <Box sx={{ padding: '1rem', marginTop: '1rem' }}>
      <Grid container spacing={{ xs: 1, sm: 2, md: 2 }} height="68vh">
        <Grid item sm={12} md={8}>
          <Plot data={trace} layout={layout} config={config} divId={plotId} />
        </Grid>
        <Grid item sm={12} md={4}>
          <Card sx={{ padding: '1rem' }}>
            <Typography variant="subtitle1" gutterBottom>
              Export Chart
            </Typography>
            <Typography variant="body2" gutterBottom>
              Can edit name or format of chart
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ my: 1 }}>
              <TextField
                size="small"
                label="Chart name"
                value={chartName?.name}
                onChange={(e: any) => handleChartName(e.target.value, 'name')}
              />
              <Typography variant="h6">.</Typography>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <Select
                  size="small"
                  value={chartName?.ext}
                  onChange={(e: any) => handleChartName(e.target.value, 'ext')}
                  autoWidth
                >
                  <MenuItem value="jpeg">jpeg</MenuItem>
                  <MenuItem value="png">png</MenuItem>
                  <MenuItem value="webp">webp</MenuItem>
                  <MenuItem value="svg">svg</MenuItem>
                </Select>
              </FormControl>
              <Button color="primary" variant="outlined" onClick={handlSaveToOmero}>
                Export
              </Button>
            </Stack>

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 2 }}>
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Button color="primary" variant="contained" onClick={handleNext}>
                Create new
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExportPublish;
