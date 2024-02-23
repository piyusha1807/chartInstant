import React from 'react';
import {
  // Accordion,
  // AccordionDetails,
  // AccordionSummary,
  // Box,
  // Button,
  // Dialog,
  // DialogContent,
  // DialogTitle,
  MenuItem,
  // Paper,
  Stack,
  TextField,
  // Typography,
  // IconButton,
  Select,
  OutlinedInput,
} from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import AddIcon from '@mui/icons-material/Add';
import '../../styles/configChart.scss';
// import ColorPicker from '../../../../components/ColorPicker';

const Structure = (props: any) => {
  const {
    result,
    stringColumnKey,
    onStringColumnKey,
    numberColumnKeys,
    onNumberColumnKeys,
    chartType,
  } = props;

  const handleDropdownChange = (value: any, typeValue: string) => {
    if (typeValue === 'stringKey') {
      // const updatedTrace = trace.map((traceItem: any) => ({
      //   ...traceItem,
      //   [type]: result[value],
      //   [typeValue]: value,
      // }));
      // setTrace(updatedTrace);
      onStringColumnKey(value);
    } else if (typeValue === 'numberKeys') {
      // const updatedTrace = value.map((optionItem: any) => ({
      //   ...trace[0],
      //   [type]: result[optionItem],
      //   [typeValue]: optionItem,
      // }));
      // setTrace(updatedTrace);
      onNumberColumnKeys(value);
    }
  };

  const getXLabel = () => {
    if (
      ['stackedColumn', 'groupedColumn', 'scatterPlot', 'lines', 'areaChart'].includes(chartType)
    ) {
      return 'X-axis';
    } else if (['stackedBar', 'groupedBar'].includes(chartType)) {
      return 'Y-axis';
    } else if (['pieChart', 'donutChart'].includes(chartType)) {
      return 'Label';
    } else {
      return 'X';
    }
  };

  // const handleColorChange = (value: string, index: number) => {
  //   const newArr = [...trace];
  //   newArr[index].marker.color = value;
  //   setTrace(newArr);
  // };

  return (
    <>
      {/* <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}> */}
      <Stack spacing={2} sx={{ px: '0.5rem', py: '1rem' }}>
        <TextField
          select
          size="small"
          label={getXLabel()}
          value={stringColumnKey}
          onChange={(e) => {
            handleDropdownChange(e.target.value, 'stringKey');
          }}
        >
          {Object.keys(result).map((key) => (
            <MenuItem value={key}>{key}</MenuItem>
          ))}
        </TextField>
        <Select
          size="small"
          label="Series"
          multiple
          input={<OutlinedInput label="Chip" />}
          value={numberColumnKeys}
          onChange={(e) => {
            handleDropdownChange(e.target.value, 'numberKeys');
          }}
        >
          {Object.keys(result).map((key) => (
            <MenuItem value={key}>{key}</MenuItem>
          ))}
        </Select>
      </Stack>
      {/* <Typography style={{ verticalAlign: 'middle', lineHeight: '35px' }}>Add Traces</Typography>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button variant="outlined" onClick={addTrace}>
          <AddIcon /> Trace
        </Button>
      </Box> */}
      {/* {trace &&
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
                      <Select
                        size="small"
                        label="Y"
                        multiple
                        input={<OutlinedInput label="Chip" />}
                        value={item.yValue}
                        onChange={(e) => {
                          handleDropdownChange(e.target.value, index, 'y', 'yValue');
                        }}
                      >
                        {Object.keys(result).map((key) => (
                          <MenuItem value={key}>{key}</MenuItem>
                        ))}
                      </Select>
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
        })} */}
    </>
  );
};

export default Structure;
