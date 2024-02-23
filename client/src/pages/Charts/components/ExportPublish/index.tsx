import React, { useState } from 'react';
import {
  Button,
  // Card,
  // FormControl,
  Grid,
  // MenuItem,
  Paper,
  // Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import ImageIcon from '@mui/icons-material/Image';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import * as Plotly from 'plotly.js';
import Plot from 'react-plotly.js';
import { useNavigate } from 'react-router';
// import { ColumnStackIcon } from '../../../../icons';

const exportList = [
  { key: 'png', title: 'Png', icon: <ImageIcon /> },
  { key: 'jpeg', title: 'JPEG', icon: <ImageIcon /> },
  { key: 'webp', title: 'Webp', icon: <ImageIcon /> },
  { key: 'svg', title: 'Svg', icon: <ImageIcon /> },
];

const ExportPublish = (props: any) => {
  const { data } = props;
  const { trace, layout, config } = data;
  const navigate = useNavigate();

  const plotId = 'plotString';

  const [chartName, setChartName] = useState<string>('chart');

  const handlSaveToOmero = (format: string) => {
    Plotly.downloadImage(plotId, {
      format,
      width: layout.width,
      height: layout.height,
      filename: chartName,
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
      <Grid container spacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid item sm={12} md={8}>
          <Plot data={trace} layout={layout} config={config} divId={plotId} />
        </Grid>
        <Grid item sm={12} md={4}>
          <Stack gap={2}>
            <TextField
              size="small"
              label="Chart name"
              value={chartName}
              onChange={(e: any) => setChartName(e.target.value)}
              fullWidth
            />

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Export Visualization
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
                  gap: '10px',
                }}
              >
                {exportList.map((item) => (
                  <Paper
                    variant="outlined"
                    onClick={() => handlSaveToOmero(item.key)}
                    sx={{
                      textAlign: 'center',
                      padding: '1em',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      '&:hover': {
                        border: '1px solid grey',
                      },
                    }}
                  >
                    {item.icon}
                    <Typography
                      variant="body2"
                      sx={{
                        marginTop: '0.5em',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Save & Publish Visualization
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  columnGap: '10px',
                  border: '1px dashed #919EAB',
                  borderRadius: '5px',
                  padding: '20px',
                }}
              >
                <Box sx={{ display: 'flex', columnGap: '10px' }}>
                  <CloudQueueIcon />
                  <Typography variant="body2">
                    Your visualization is not saved and published
                  </Typography>
                </Box>
                <Button color="primary" variant="contained">
                  Save & Publish
                </Button>
              </Box>
              <Typography variant="body2" gutterBottom>
                You wll need to publish this visualization before embedding it on your website or
                sharing it on social media.
              </Typography>
              <Typography variant="body2" gutterBottom>
                Your published visualization will still only be visible to people who know its URL.
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Share & Embeded
              </Typography>
              <Typography variant="body2" gutterBottom>
                <b>Link</b> to your Visualization
              </Typography>
              <TextField
                size="small"
                value={'abc'}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
              <Typography variant="body2" gutterBottom>
                <b>Embeded code</b> for your Visualization:
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 2 }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Button color="primary" variant="contained" onClick={handleNext}>
              Create new
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExportPublish;
