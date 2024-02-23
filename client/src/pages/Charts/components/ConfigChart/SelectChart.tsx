import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import {
  // ColumnIcon,
  ColumnStackIcon,
  ColumnGroupIcon,
  // BarIcon,
  BarStackIcon,
  BarGroupIcon,
  PieIcon,
  DonutIcon,
  AreaIcon,
  ScatterIcon,
  LineIcon,
} from '../../../../icons';

const iconList = [
  // { name: 'column', titleName: 'Column', icon: <ColumnIcon /> },
  { name: 'stackedColumn', titleName: 'Stacked Column', icon: <ColumnStackIcon /> },
  { name: 'groupedColumn', titleName: 'Grouped Column', icon: <ColumnGroupIcon /> },
  // { name: 'bar', titleName: 'Bar', icon: <BarIcon /> },
  { name: 'stackedBar', titleName: 'Stacked Bar', icon: <BarStackIcon /> },
  { name: 'groupedBar', titleName: 'Grouped Bar', icon: <BarGroupIcon /> },
  { name: 'pieChart', titleName: 'Pie chart', icon: <PieIcon /> },
  { name: 'donutChart', titleName: 'Donut Chart', icon: <DonutIcon /> },
  { name: 'scatterPlot', titleName: 'Scatter Plot', icon: <ScatterIcon /> },
  { name: 'lines', titleName: 'Lines', icon: <LineIcon /> },
  { name: 'areaChart', titleName: 'Area Chart', icon: <AreaIcon /> },
];

const SelectChart = ({ trace, onChartChange }: any) => {
  return (
    <Box sx={{ flexGrow: 1, m: 1 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '10px',
        }}
      >
        {iconList.map((item, idx) => (
          <Box key={idx}>
            <Paper
              variant="outlined"
              onClick={() => onChartChange(item.name)}
              sx={{
                textAlign: 'center',
                padding: '1em',
                backgroundColor: item.name === trace[0]?.typeValue ? '#f0f9ff' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                '&:hover': {
                  border: '1px solid grey',
                },
              }}
            >
              {item.icon}
              <Typography variant="body2" sx={{ marginTop: '0.5em' }}>
                {item.titleName}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SelectChart;
