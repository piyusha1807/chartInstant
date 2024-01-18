import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 54;
const APP_BAR_DESKTOP = 62;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  backgroundColor: '#ebf0f8',
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const userLogin = useSelector((state: any) => state.userLogin);

  return (
    <RootStyle>
      <DashboardNavbar userLogin={userLogin} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
