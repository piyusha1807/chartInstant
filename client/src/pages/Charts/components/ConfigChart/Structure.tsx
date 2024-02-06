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
  const { result, trace, setTrace } = props;

  const handleDropdownChange = (value: any, type: string, typeValue: string) => {
    if (typeValue === 'xValue') {
      console.log(value);
      const updatedTrace = trace.map((traceItem: any) => ({
        ...traceItem,
        [type]: result[value],
        [typeValue]: value,
      }));
      setTrace(updatedTrace);
    } else if (typeValue === 'yValue') {
      console.log({ value });
      const updatedTrace = value.map((optionItem: any) => ({
        ...trace[0],
        [type]: result[optionItem],
        [typeValue]: optionItem,
      }));
      console.log({ updatedTrace });
      setTrace(updatedTrace);
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
      <Stack spacing={2}>
        <TextField
          select
          size="small"
          label="X"
          value={trace.map((item: any) => item.xValue)}
          onChange={(e) => {
            handleDropdownChange(e.target.value, 'x', 'xValue');
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
          value={trace.map((item: any) => item.yValue)}
          onChange={(e) => {
            handleDropdownChange(e.target.value, 'y', 'yValue');
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
