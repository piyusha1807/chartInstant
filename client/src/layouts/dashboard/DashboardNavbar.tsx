import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import Logo from '../../components/Logo';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 45;
const APPBAR_DESKTOP = 50;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  userLogin: PropTypes.object,
};

export default function DashboardNavbar({ userLogin }: any) {
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const loggedIn = !!(userInfo && userInfo.token);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box component={RouterLink} to="/">
          <Logo />
        </Box>
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {loggedIn && (
            <IconButton sx={{ color: 'text.secondary' }}>
              <Icon icon={shoppingBagFill} />
            </IconButton>
          )}
          <LanguagePopover />
          {loggedIn ? (
            <AccountPopover />
          ) : (
            <>
              <Button color="primary" variant="outlined" onClick={handleLogin}>
                Login
              </Button>
              <Button color="primary" variant="contained" onClick={handleRegister}>
                Register
              </Button>
            </>
          )}
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
