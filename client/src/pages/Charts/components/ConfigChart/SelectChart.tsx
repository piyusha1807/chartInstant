import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const iconList = [
  { name: 'bar', titleName: 'Bar', path: '/static/images/bar.png' },
  { name: 'pie', titleName: 'Pie', path: '/static/images/pie.png' },
  { name: 'donut', titleName: 'Donut', path: '/static/images/pie.png' },
  { name: 'scatter', titleName: 'Scatter', path: '/static/images/scatter.png' },
  { name: 'donut', titleName: 'Donut', path: '/static/images/donut.png' },
  { name: 'area', titleName: 'Area', path: '/static/images/area.png' },
  { name: 'lines', titleName: 'Lines', path: '/static/images/area.png' },
  { name: 'stacked_column', titleName: 'Stacked Column', path: '/static/images/area.png' }
];

const SelectChart = (props: any) => {
  const { trace, setTrace, layout, setLayout } = props;

  const handleChartChange = (chartType: string, value: string) => {
    const newArr = [...trace];
    newArr.forEach((_, index) => {
      if (chartType === 'scatter') {
        newArr[index].type = 'scatter';
        newArr[index].mode = 'markers';
      } else if (chartType === 'lines') {
        newArr[index].type = 'scatter';
        newArr[index].mode = 'lines+markers';
      } else if (chartType === 'pie') {
        newArr[index].type = 'pie';
        newArr[index].hole = '0';
      } else if (chartType === 'donut') {
        newArr[index].type = 'pie';
        newArr[index].hole = '.4';
      } else if (chartType === 'stacked_column') {
        newArr[index].type = 'bar';
        setLayout({ ...layout, barmode: 'stack' });
      } else {
        newArr[index].type = chartType;
      }
      newArr[index].typeValue = value;
    });

    // const modifiedTrace = trace.map((item) => ({...item, type: chartType, mode: chartMode, hole: chartHole}))
    setTrace(newArr);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128
        }
      }}
    >
      {iconList.map((item, idx) => {
        return (
          <Paper
            variant="outlined"
            onClick={() => {
              handleChartChange(item.name, item.titleName);
            }}
            style={{ textAlign: 'center', padding: '0.5em' }}
            key={idx}
          >
            <img src={item.path} alt={item.titleName} style={{ margin: 'auto' }} />
            <Typography style={{ marginTop: '0.5em' }}>{item.titleName}</Typography>
          </Paper>
        );
      })}
    </Box>
  );
};

export default SelectChart;
