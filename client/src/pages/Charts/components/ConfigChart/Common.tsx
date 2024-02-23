import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  TextField,
  FormControlLabel,
  //   ToggleButtonGroup,
  //   ToggleButton,
  Switch,
  MenuItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ColorPicker from '../../../../components/ColorPicker';

const fontObj = [
  'Arial',
  'Balto',
  'Courier New',
  'Droid Sans',
  'Droid Serif',
  'Droid Sans Mono',
  'Gravitas One',
  'Old Standard TT',
  'Open Sans',
  'Overpass',
  'PT Sans Narrow',
  'Raleway',
  'Times New Roman',
];

const Common = (props: any) => {
  const { layout, setLayout } = props;

  const [expanded, setExpanded] = useState(null);

  const handleAccordionChange = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleCanvasChange = (value: any, type: any) => {
    setLayout({ ...layout, [type]: value });
  };

  const handleCanvasNestedChange = (value: any, type: string, nType: string) => {
    const newObj = { ...layout };
    newObj[type][nType] = value;
    setLayout(newObj);
  };

  const handleCanvasNNestedChange = (value: any, type: string, nType: string, nnType: string) => {
    const newObj = { ...layout };
    newObj[type][nType][nnType] = value;
    setLayout(newObj);
  };

  const handleCanvasNNNestedChange = (
    value: any,
    type: string,
    nType: string,
    nnType: string,
    nnnType: string
  ) => {
    const newObj = { ...layout };
    newObj[type][nType][nnType][nnnType] = value;
    setLayout(newObj);
  };

  return (
    <Stack sx={{ px: '0.5rem', py: '1rem' }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        // sx={{ m: '1rem' }}
      >
        <Typography>Size</Typography>
        <TextField
          id="outlined-number"
          label="Width"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          value={layout?.width}
          onChange={(e) => handleCanvasChange(e.target.value, 'width')}
        />
        <TextField
          id="outlined-number"
          label="Height"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          value={layout?.height}
          onChange={(e) => handleCanvasChange(e.target.value, 'height')}
        />
      </Stack>
      <ColorPicker
        color={layout?.plot_bgcolor}
        setColor={handleCanvasChange}
        property={['plot_bgcolor']}
        label="Plot color"
      />
      <ColorPicker
        color={layout?.paper_bgcolor}
        setColor={handleCanvasChange}
        property={['paper_bgcolor']}
        label="Paper color"
      />
      <Accordion
        expanded={expanded === 'title'}
        onChange={handleAccordionChange('title')}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="title"
          id="title"
          sx={{ padding: '0px' }}
        >
          <Typography>Title</Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            backgroundColor: expanded === 'title' ? '#f4f4f696' : 'inherit',
            borderRadius: '4px',
            padding: '1rem',
          }}
        >
          <Stack spacing={2}>
            <TextField
              id="outlined-number"
              label="Title"
              size="small"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              value={layout?.title?.text}
              onChange={(e) => handleCanvasNestedChange(e.target.value, 'title', 'text')}
            />
            <TextField
              id="outlined-number"
              label="Font size"
              type="number"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={layout?.title?.font?.size}
              onChange={(e) => {
                handleCanvasNNestedChange(e.target.value, 'title', 'font', 'size');
              }}
            />
            <TextField
              select
              size="small"
              label="Font family"
              value={layout?.title?.font?.family}
              onChange={(e) => {
                handleCanvasNNestedChange(e.target.value, 'title', 'font', 'family');
              }}
            >
              {fontObj.map((value) => (
                <MenuItem value={value}>{value}</MenuItem>
              ))}
            </TextField>
            <ColorPicker
              color={layout?.title?.font?.color}
              setColor={handleCanvasNNestedChange}
              property={['title', 'font', 'color']}
              label="Color"
            />
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <Typography>Position</Typography>
              <TextField
                id="outlined-number"
                label="X"
                type="number"
                size="small"
                inputProps={{
                  step: '0.1',
                  min: '-1.0',
                  max: '1.0',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={layout?.title?.x}
                onChange={(e) => handleCanvasNestedChange(e.target.value, 'title', 'x')}
              />
              <TextField
                id="outlined-number"
                label="Y"
                type="number"
                size="small"
                inputProps={{
                  step: '0.1',
                  min: '-1.0',
                  max: '1.0',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={layout?.title?.y}
                onChange={(e) => handleCanvasNestedChange(e.target.value, 'title', 'y')}
              />
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'verticalAxis'}
        onChange={handleAccordionChange('verticalAxis')}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="vertical axis"
          id="vertical-axis"
          sx={{ padding: '0px' }}
        >
          <Typography>Vertical axis</Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            backgroundColor: expanded === 'verticalAxis' ? '#f4f4f696' : 'inherit',
            borderRadius: '4px',
            padding: '1rem',
          }}
        >
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={layout?.xaxis?.visible}
                  onChange={(e) => {
                    handleCanvasNestedChange(e.target.checked, 'xaxis', 'visible');
                  }}
                />
              }
              label="Visible"
            />
            {layout?.xaxis?.visible && (
              <>
                <TextField
                  id="outlined-number"
                  label="Text"
                  size="small"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={layout?.xaxis?.title?.text}
                  onChange={(e) => handleCanvasNestedChange(e.target.value, 'xaxis', 'title')}
                />
                <TextField
                  id="outlined-number1"
                  label="Font size"
                  type="number"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={layout?.xaxis?.title?.font?.size}
                  onChange={(e) => {
                    handleCanvasNNNestedChange(e.target.value, 'xaxis', 'title', 'font', 'size');
                  }}
                />
                <TextField
                  select
                  size="small"
                  label="Font family"
                  value={layout?.xaxis?.title?.font?.family}
                  onChange={(e) => {
                    handleCanvasNNNestedChange(e.target.value, 'xaxis', 'title', 'font', 'family');
                  }}
                >
                  {fontObj.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </TextField>
                <ColorPicker
                  color={layout?.xaxis?.title?.font?.color}
                  setColor={handleCanvasNNNestedChange}
                  property={['xaxis', 'title', 'font', 'color']}
                  label="Color"
                />
              </>
            )}
            <FormControlLabel
              control={
                <Switch
                  checked={layout?.xaxis?.showgrid}
                  onChange={(e) => {
                    handleCanvasNestedChange(e.target.checked, 'xaxis', 'showgrid');
                  }}
                />
              }
              label="Show grid"
            />
            {layout?.xaxis?.showgrid && (
              <>
                <TextField
                  id="outlined-number"
                  label="Width"
                  size="small"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={layout?.xaxis?.gridwidth}
                  onChange={(e) => handleCanvasNestedChange(e.target.value, 'xaxis', 'gridwidth')}
                />
                <ColorPicker
                  color={layout?.xaxis?.gridcolor}
                  setColor={handleCanvasNestedChange}
                  property={['xaxis', 'gridcolor']}
                  label="Color"
                />
              </>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'horizontalAxis'}
        onChange={handleAccordionChange('horizontalAxis')}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="horizontal axis"
          id="horizontal-axis"
          sx={{ padding: '0px' }}
        >
          <Typography>Horizontal axis</Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            backgroundColor: expanded === 'horizontalAxis' ? '#f4f4f696' : 'inherit',
            borderRadius: '4px',
            padding: '1rem',
          }}
        >
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={layout?.yaxis?.visible}
                  onChange={(e) => {
                    handleCanvasNestedChange(e.target.checked, 'yaxis', 'visible');
                  }}
                />
              }
              label="Visible"
            />
            {layout?.yaxis?.visible && (
              <>
                <TextField
                  id="outlined-number"
                  label="Text"
                  size="small"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={layout?.yaxis?.title?.text}
                  onChange={(e) => handleCanvasNestedChange(e.target.value, 'yaxis', 'title')}
                />
                <TextField
                  id="outlined-number1"
                  label="Font size"
                  type="number"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={layout?.yaxis?.title?.font?.size}
                  onChange={(e) => {
                    handleCanvasNNNestedChange(e.target.value, 'yaxis', 'title', 'font', 'size');
                  }}
                />
                <TextField
                  select
                  size="small"
                  label="Font family"
                  value={layout?.yaxis?.title?.font?.family}
                  onChange={(e) => {
                    handleCanvasNNNestedChange(e.target.value, 'yaxis', 'title', 'font', 'family');
                  }}
                >
                  {fontObj.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </TextField>
                <ColorPicker
                  color={layout?.yaxis?.title?.font?.color}
                  setColor={handleCanvasNNNestedChange}
                  property={['yaxis', 'title', 'font', 'color']}
                  label="Color"
                />
              </>
            )}
            <FormControlLabel
              control={
                <Switch
                  checked={layout?.yaxis?.showgrid}
                  onChange={(e) => {
                    handleCanvasNestedChange(e.target.checked, 'yaxis', 'showgrid');
                  }}
                />
              }
              label="Show grid"
            />
            {layout?.yaxis?.showgrid && (
              <>
                <TextField
                  id="outlined-number"
                  label="Width"
                  size="small"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={layout?.yaxis?.gridwidth}
                  onChange={(e) => handleCanvasNestedChange(e.target.value, 'yaxis', 'gridwidth')}
                />
                <ColorPicker
                  color={layout?.yaxis?.gridcolor}
                  setColor={handleCanvasNestedChange}
                  property={['yaxis', 'gridcolor']}
                  label="Color"
                />
              </>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'legend'}
        onChange={handleAccordionChange('legend')}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="legend"
          id="legend"
          sx={{ padding: '0px' }}
        >
          <Typography>Legend</Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            backgroundColor: expanded === 'legend' ? '#f4f4f696' : 'inherit',
            borderRadius: '4px',
            padding: '1rem',
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={layout?.showlegend}
                onChange={(e) => {
                  handleCanvasChange(e.target.checked, 'showlegend');
                }}
              />
            }
            label="Show Legend"
          />
          {layout?.showlegend && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              // sx={{ my: 1 }}
            >
              <Typography>Position</Typography>
              <TextField
                id="outlined-number"
                label="X"
                type="number"
                size="small"
                inputProps={{
                  step: '0.1',
                  min: '-1.0',
                  max: '1.0',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={layout?.legend?.x}
                onChange={(e) => {
                  handleCanvasNestedChange(e.target.value, 'legend', 'x');
                }}
              />

              <TextField
                id="outlined-number"
                label="Y"
                type="number"
                size="small"
                inputProps={{
                  step: '0.1',
                  min: '-1.0',
                  max: '1.0',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={layout?.legend?.y}
                onChange={(e) => handleCanvasNestedChange(e.target.value, 'legend', 'y')}
              />
            </Stack>
          )}
          {/* <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ my: 1 }}
          >
            <Typography>Orientation</Typography>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={layout?.legend?.orientation}
              onChange={(_, value) => {
                handleCanvasLegendChange('orientation', value);
              }}
              aria-label="text alignment"
            >
              <ToggleButton value="v" aria-label="Vertical">
                Vertical
              </ToggleButton>
              <ToggleButton value="h" aria-label="Horizontal">
                Horizontal
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack> */}
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default Common;
