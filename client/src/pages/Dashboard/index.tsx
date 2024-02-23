import React from 'react';
import { Box, Paper, Typography, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import ImageIcon from '@mui/icons-material/Image';
import { useNavigate } from 'react-router';

const newChartList = [
  {
    key: 'new',
    title: 'Create New',
    icon: <AddIcon sx={{ color: '#1d9bfb', width: '50%', height: '80%' }} />,
  },
  {
    key: 'example1',
    title: 'Example 1',
    icon: (
      <Box
        component="img"
        src="static/images/example1.png"
        sx={{ width: '100%', height: '100%' }}
      />
    ),
  },
  {
    key: 'example2',
    title: 'Example 2',
    icon: (
      <Box
        component="img"
        src="static/images/example1.png"
        sx={{ width: '100%', height: '100%' }}
      />
    ),
  },
  {
    key: 'example3',
    title: 'Example 3',
    icon: (
      <Box
        component="img"
        src="static/images/example1.png"
        sx={{ width: '100%', height: '100%' }}
      />
    ),
  },
];

const recentChartList = [
  {
    key: 'png',
    title: 'Create New',
    icon: (
      <Box
        component="img"
        src="static/images/example1.png"
        sx={{ width: '100%', height: '100%' }}
      />
    ),
  },
  {
    key: 'jpeg',
    title: 'JPEG',
    icon: (
      <Box
        component="img"
        src="static/images/example1.png"
        sx={{ width: '100%', height: '100%' }}
      />
    ),
  },
  {
    key: 'webp',
    title: 'Webp',
    icon: (
      <Box
        component="img"
        src="static/images/example1.png"
        sx={{ width: '100%', height: '100%' }}
      />
    ),
  },
  {
    key: 'svg',
    title: 'Svg',
    icon: (
      <Box
        component="img"
        src="static/images/example1.png"
        sx={{ width: '100%', height: '100%' }}
      />
    ),
  },
];

function GridView({ list }: any) {
  const navigate = useNavigate();

  const handleClick = (type: string | number) => {
    if (type === 'new') {
      navigate('/chart/new/upload');
    }
  };

  if (list.length <= 0) {
    return <Box>No data to show</Box>;
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '10px',
      }}
    >
      {list.map((item: any) => (
        <Paper
          variant="outlined"
          onClick={() => handleClick(item.key)}
          sx={{
            textAlign: 'center',
            padding: '1em',
            backgroundColor: 'white',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            '&:hover': {
              '& .paper-text': {
                textDecoration: 'underline',
              },
            },
          }}
        >
          {item.icon}
          <Typography
            variant="body2"
            className="paper-text"
            sx={{
              marginTop: '0.5em',
            }}
          >
            {item.title}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

function Dashboard() {
  return (
    <Stack gap={4} sx={{ p: '1rem' }}>
      <GridView list={newChartList} />
      <Stack>
        <Typography variant="subtitle1" gutterBottom>
          Recently Published
        </Typography>
        <GridView list={recentChartList} />
      </Stack>
    </Stack>
  );
}

export default Dashboard;
