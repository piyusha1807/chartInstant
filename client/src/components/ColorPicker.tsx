import React, { useState } from 'react';
import { Typography, Stack, Box, Popover } from '@mui/material';
import { ChromePicker } from 'react-color';

const ColorPicker = (props: any) => {
  const { color, setColor, property, label } = props;
  const [showColorPicker, setShowColorPicker] = useState(false);
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{ my: 1 }}
      >
        <Typography>{label}</Typography>
        {/* <Box
          sx={{
            width: 80,
            height: 35,
            backgroundColor: color,
            borderRadius: '5px',
            border: '1px solid #a2a4a7',
            boxShadow: '-7px 9px 25px -6px rgba(184,184,184,1)',
          }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <p
            style={{
              color: 'white',
              textAlign: 'center',
              verticalAlign: 'middle',
              lineHeight: '35px',
              cursor: 'pointer',
            }}
          >
            {color}
          </p>
        </Box> */}
        <Box
          sx={{
            width: 100,
            height: 40,
            borderRadius: '5px',
            border: '1px solid #e5e8eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0px 8px'
          }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <Box
            sx={{
              height: '24px',
              width: '24px',
              backgroundColor: color,
              border: '1px solid #e5e8eb',
              borderRadius: '2px',
            }}
          />
          <input
            style={{ width: '50px', border: 'none', outline: 'none' }}
            value={color}
            onChange={(e) => setColor(e.target.value, ...property)}
          />
        </Box>
        <Popover
          // id={id}
          open={showColorPicker}
          // anchorEl={anchorEl}
          onClose={() => setShowColorPicker(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <ChromePicker color={color} onChange={(e) => setColor(e.hex, ...property)} />
        </Popover>
      </Stack>
    </>
  );
};

export default ColorPicker;
