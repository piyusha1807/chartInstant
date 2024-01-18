import React, { useState } from 'react';
import { Box } from '@mui/system';
import { Card, Tab, Tabs } from '@mui/material';
import { useParams } from 'react-router-dom';
import Profile from './Profile';

interface TabPanelProps {
  children?: React.ReactNode;
  value: string;
  selValue: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, selValue, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== selValue}
      id={`tabpanel-${selValue}`}
      aria-labelledby={`tab-${selValue}`}
      {...other}
    >
      {value === selValue && children}
    </div>
  );
}

export default function Settings() {
  const params = useParams();
  const { settingTab = 'profile' } = params;

  const [tabOption, setTabOption] = useState(settingTab || 'profile');
  return (
    <Card sx={{ padding: '1rem' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabOption}
          onChange={(_, value) => setTabOption(value)}
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Configuration tabs"
        >
          <Tab label="Profile" value="profile" />
          {/* <Tab label="Theme" value="theme" /> */}
        </Tabs>
      </Box>
      <Box style={{ height: '62vh', overflow: 'auto' }}>
        <TabPanel value={tabOption} selValue="profile">
          <Profile />
        </TabPanel>
        {/* <TabPanel value={tabOption} selValue="theme">
          Theme
        </TabPanel> */}
      </Box>
    </Card>
  );
}
