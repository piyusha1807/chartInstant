import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import '../../styles/configChart.scss';
import ColorPicker from '../../../../components/ColorPicker';

const iconList = [
  { name: 'bar', titleName: 'Bar', path: '/static/images/bar.png' },
  { name: 'pie', titleName: 'Pie', path: '/static/images/pie.png' },
  { name: 'donut', titleName: 'Donut', path: '/static/images/pie.png' },
  { name: 'scatter', titleName: 'Scatter', path: '/static/images/scatter.png' },
  { name: 'donut', titleName: 'Donut', path: '/static/images/donut.png' },
  { name: 'area', titleName: 'Area', path: '/static/images/area.png' },
  { name: 'lines', titleName: 'Lines', path: '/static/images/area.png' },
  { name: 'stacked_column', titleName: 'Stacked Column', path: '/static/images/area.png' },
];

const Structure = (props: any) => {
  const { result, trace, setTrace, layout, setLayout } = props;

  const [chartModal, setChartModal] = useState(false);

  const handleDropdownChange = (value: string, index: number, type: string, typeValue: string) => {
    const newArr = [...trace];
    newArr[index][type] = result[value];
    newArr[index][typeValue] = value;
    setTrace(newArr);
  };

  const handleChartChange = (chartType: string, index: number, value: string) => {
    const newArr = [...trace];
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
    setTrace(newArr);
    setChartModal(false);
  };

  const handleColorChange = (value: string, index: number) => {
    const newArr = [...trace];
    newArr[index].marker.color = value;
    setTrace(newArr);
  };

  const addTrace = () => {
    setTrace([
      ...trace,
      {
        x: [],
        y: [],
        xValue: '',
        yValue: '',
        typeValue: 'Bar',
        type: 'bar',
        mode: 'markers',
        marker: { color: '#483c84' },
      },
    ]);
  };

  const removeTrace = () => {
    const newArr = [...trace];
    newArr.pop();
    setTrace(newArr);
  };

  const handleChartModal = () => {
    setChartModal(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
        <Typography style={{ verticalAlign: 'middle', lineHeight: '35px' }}>Add Traces</Typography>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button variant="outlined" onClick={addTrace}>
          <AddIcon /> Trace
        </Button>
      </Box>
      {trace &&
        trace.map((item: any, index: number) => {
          return (
            <Accordion defaultExpanded disableGutters>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="shape data"
                id="shape-data"
                className="accordion-delete"
              >
                <>
                  <Typography>{`Trace ${index}`}</Typography>
                  <IconButton aria-label="Delete trace" component="span">
                    {trace.length > 1 && (
                      <Typography onClick={removeTrace}>
                        <DeleteOutlinedIcon />
                      </Typography>
                    )}
                  </IconButton>
                </>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <TextField
                    label="Chart Type"
                    value={item.typeValue}
                    onClick={handleChartModal}
                    size="small"
                  />
                  <Dialog open={chartModal} onClose={() => setChartModal(false)}>
                    <DialogTitle>Select Chart type</DialogTitle>
                    <DialogContent>
                      <Box
                        sx={{
                          display: 'flex',
                          '& > :not(style)': {
                            m: 1,
                            width: 128,
                            height: 128,
                          },
                        }}
                      >
                        {iconList.map((item, idx) => {
                          return (
                            <Paper
                              variant="outlined"
                              onClick={() => {
                                handleChartChange(item.name, index, item.titleName);
                              }}
                              style={{ textAlign: 'center', padding: '0.5em' }}
                              key={idx}
                            >
                              <img
                                src={item.path}
                                alt={item.titleName}
                                style={{ margin: 'auto' }}
                              />
                              <Typography style={{ marginTop: '0.5em' }}>
                                {item.titleName}
                              </Typography>
                            </Paper>
                          );
                        })}
                      </Box>
                    </DialogContent>
                  </Dialog>
                  {item.type === 'pie' || item.type === 'donut' ? (
                    <>
                      <TextField
                        select
                        size="small"
                        label="Labels"
                        value={item.lValue}
                        onChange={(e) => {
                          handleDropdownChange(e.target.value, index, 'labels', 'lValue');
                        }}
                      >
                        {Object.keys(result).map((key) => (
                          <MenuItem value={key}>{key}</MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        select
                        size="small"
                        label="Values"
                        value={item.vValue}
                        onChange={(e) => {
                          handleDropdownChange(e.target.value, index, 'values', 'vValue');
                        }}
                      >
                        {Object.keys(result).map((key) => (
                          <MenuItem value={key}>{key}</MenuItem>
                        ))}
                      </TextField>
                    </>
                  ) : (
                    <>
                      <TextField
                        select
                        size="small"
                        label="X"
                        value={item.xValue}
                        onChange={(e) => {
                          handleDropdownChange(e.target.value, index, 'x', 'xValue');
                        }}
                      >
                        {Object.keys(result).map((key) => (
                          <MenuItem value={key}>{key}</MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        select
                        size="small"
                        label="Y"
                        value={item.yValue}
                        onChange={(e) => {
                          handleDropdownChange(e.target.value, index, 'y', 'yValue');
                        }}
                      >
                        {Object.keys(result).map((key) => (
                          <MenuItem value={key}>{key}</MenuItem>
                        ))}
                      </TextField>
                    </>
                  )}
                </Stack>
                <ColorPicker
                  color={item.marker.color}
                  setColor={handleColorChange}
                  property={[index]}
                  label="Color"
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
    </>
  );
};

export default Structure;
