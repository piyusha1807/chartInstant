import React from 'react';
import { Typography, Stack, Box, Popover } from '@mui/material';
import { ChromePicker } from 'react-color';

const ColorPicker = (props: any) => {
  const { color, setColor, property, label } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
        <Box
          aria-describedby={id}
          sx={{
            width: 100,
            height: 40,
            borderRadius: '5px',
            border: '1px solid #e5e8eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0px 8px',
          }}
          onClick={(e: any) => handleClick(e)}
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
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <ChromePicker color={color} onChange={(e) => setColor(e.hex, ...property)} />
        </Popover>
      </Stack>
    </>
  );
};

export default ColorPicker;
