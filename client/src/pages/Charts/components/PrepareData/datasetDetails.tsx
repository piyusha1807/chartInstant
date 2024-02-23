import React, { useEffect, useState } from 'react';
import { Stack, Typography, Divider } from '@mui/material';
import Plot from 'react-plotly.js';

const DatasetDetails = ({ data }: any) => {
  const [overview, setOverview] = useState({ rows: 0, columns: 0 });
  const [datasetQuality, setDatasetQuality] = useState([0, 0, 0]);

  const checkDataValidity = (matrix: any) => {
    const numRows = matrix.length;
    const numColumns = matrix[0].length;

    let validCount = 0;
    let invalidCount = 0;
    let missingCount = 0;

    for (let j = 0; j < numColumns; j++) {
      const dataTypes = Array(numColumns).fill('string');
      let columnDataType = null;

      for (let i = 1; i < numRows; i++) {
        const value = matrix[i][j];

        if (value === null || value === undefined || value === '') {
          missingCount++;
        } else {
          const currentDataType = typeof value === 'string' ? 'string' : 'number';
          if (columnDataType === null) {
            columnDataType = currentDataType;
          } else if (columnDataType !== currentDataType) {
            invalidCount++;
            break;
          } else {
            validCount++;
          }
        }
      }

      dataTypes[j] = columnDataType;
    }

    setDatasetQuality([validCount, invalidCount, missingCount]);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const rows = data.length;
      const columns = data[0].length;
      checkDataValidity(data);

      setOverview({ rows, columns });
    }
  }, [JSON.stringify(data)]);

  return (
    <Stack spacing={1.2} sx={{ padding: '1rem' }}>
      <Typography variant="subtitle1">Dataset Overview</Typography>
      <Divider />
      <Stack spacing={1} direction="row">
        <Typography variant="body2">Total Rows:</Typography>
        <Typography variant="body1">{overview.rows}</Typography>
      </Stack>
      <Stack spacing={1} direction="row">
        <Typography variant="body2">Total Columns:</Typography>
        <Typography variant="body1">{overview.columns}</Typography>
      </Stack>
      <Stack spacing={1} direction="row">
        <Typography variant="body2">Data Types:</Typography>
        <Typography variant="body1">4</Typography>
      </Stack>

      <Typography variant="subtitle1">Dataset Quality</Typography>
      <Divider />
      <Stack spacing={1}>
        <Plot
          data={[
            {
              values: datasetQuality,
              labels: ['Valid Data', 'Invalid Data', 'Missing Data'],
              type: 'pie',
              marker: {
                colors: ['#4CAF50', '#F44336', '#9E9E9E'],
              },
            },
          ]}
          layout={{
            autosize: true,
            height: 300,
            width: 300,
            margin: {
              t: 20,
              l: 0,
            },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
          }}
          config={{ displayModeBar: false, displaylogo: false, responsive: true }}
        />
      </Stack>
    </Stack>
  );
};

export default DatasetDetails;
