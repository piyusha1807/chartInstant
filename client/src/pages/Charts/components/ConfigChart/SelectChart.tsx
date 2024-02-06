import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const iconList = [
  { name: 'column', titleName: 'Column', path: '/static/images/bar.png' },
  { name: 'stackedColumn', titleName: 'Stacked Column', path: '/static/images/bar.png' },
  { name: 'groupedColumn', titleName: 'Grouped Column', path: '/static/images/bar.png' },
  { name: 'bar', titleName: 'Bar', path: '/static/images/bar.png' },
  { name: 'stackedBar', titleName: 'Stacked Bar', path: '/static/images/bar.png' },
  { name: 'groupedBar', titleName: 'Grouped Bar', path: '/static/images/bar.png' },
  { name: 'pieChart', titleName: 'Pie chart', path: '/static/images/pie.png' },
  { name: 'donutChart', titleName: 'Donut Chart', path: '/static/images/donut.png' },
  { name: 'scatterPlot', titleName: 'Scatter Plot', path: '/static/images/scatter.png' },
  { name: 'lines', titleName: 'Lines', path: '/static/images/area.png' },
  { name: 'areaChart', titleName: 'Area Chart', path: '/static/images/area.png' },
];

const SelectChart = (props: any) => {
  const { trace, setTrace, layout, setLayout } = props;

  const handleChartChange = (chartType: string) => {
    const newArr = [...trace];
    newArr.forEach((_, index) => {
      if (chartType === 'scatterPlot') {
        newArr[index].type = 'scatter';
        newArr[index].mode = 'markers';
      } else if (chartType === 'lines') {
        newArr[index].type = 'scatter';
        newArr[index].mode = 'lines+markers';
      } else if (chartType === 'pieChart') {
        newArr[index].type = 'pie';
        newArr[index].hole = '0';
      } else if (chartType === 'donutChart') {
        newArr[index].type = 'pie';
        newArr[index].hole = '.4';
      } else if (chartType === 'column') {
        newArr[index].type = 'bar';
        newArr[index].orientation = undefined;
        setLayout({ ...layout, barmode: undefined });
      } else if (chartType === 'stackedColumn') {
        newArr[index].type = 'bar';
        newArr[index].orientation = undefined;
        setLayout({ ...layout, barmode: 'stack' });
      } else if (chartType === 'groupedColumn') {
        newArr[index].type = 'bar';
        newArr[index].orientation = undefined;
        setLayout({ ...layout, barmode: 'group' });
      } else if (chartType === 'bar') {
        newArr[index].type = 'bar';
        newArr[index].orientation = 'h';
        setLayout({ ...layout, barmode: undefined });
      } else if (chartType === 'stackedBar') {
        newArr[index].type = 'bar';
        newArr[index].orientation = 'h';
        setLayout({ ...layout, barmode: 'stack' });
      } else if (chartType === 'groupedBar') {
        newArr[index].type = 'bar';
        newArr[index].orientation = 'h';
        setLayout({ ...layout, barmode: 'group' });
      } else {
        newArr[index].type = chartType;
      }
      newArr[index].typeValue = chartType;
    });

    // const modifiedTrace = trace.map((item) => ({...item, type: chartType, mode: chartMode, hole: chartHole}))
    setTrace(newArr);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > :not(style)': {
          m: 1,
          width: 100,
          height: 100,
        },
      }}
    >
      {iconList.map((item, idx) => {
        return (
          <Paper
            variant="outlined"
            onClick={() => {
              handleChartChange(item.name);
            }}
            style={{
              textAlign: 'center',
              padding: '0.5em',
              backgroundColor: `${item.name === trace[0].typeValue ? '#f0f9ff' : ''}`,
              cursor: 'pointer',
            }}
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
