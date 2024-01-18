import React from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import TextField from '@mui/material/TextField';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Button, List, Stack } from '@mui/material';

function ProfileList(props: any) {
  const { label, content = '', children } = props;
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText secondary={label} />
        <ListItemText primary={content} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
}

const Profile = () => {
  const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') || '{}')
    : null;

  const { name: uName = '', email: uEmail = '' } = userInfoFromStorage;

  const formikName = useFormik({
    initialValues: {
      name: uName,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Display name is required'),
    }),
    onSubmit: async () => {
      // dispatch(register(values));
    },
  });

  const formikEmail = useFormik({
    initialValues: {
      email: uEmail,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Email must be a valid email address')
        .required('Email is required'),
    }),
    onSubmit: async () => {
      // dispatch(register(values));
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      cPassword: '',
      nPassword: '',
    },
    validationSchema: Yup.object().shape({
      cPassword: Yup.string().required('Current password is required'),
      nPassword: Yup.string().required('New password is required'),
    }),
    onSubmit: async () => {
      // dispatch(register(values));
    },
  });

  return (
    <>
      <Stack spacing={3} my={3} sx={{ width: '50%', mx: 'auto' }}>
        <FormikProvider value={formikName}>
          <Form autoComplete="off" noValidate onSubmit={formikName.handleSubmit}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <TextField
                fullWidth
                type="text"
                label="Display name"
                {...formikName.getFieldProps('name')}
                error={Boolean(formikName.touched.name && formikName.errors.name)}
                helperText={formikName.touched.name && formikName.errors.name}
              />
              <Button type="submit">Change name</Button>
            </Stack>
          </Form>
        </FormikProvider>
        <FormikProvider value={formikEmail}>
          <Form autoComplete="off" noValidate onSubmit={formikEmail.handleSubmit}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <TextField
                fullWidth
                type="email"
                label="Email"
                {...formikEmail.getFieldProps('email')}
                error={Boolean(formikEmail.touched.email && formikEmail.errors.email)}
                helperText={formikEmail.touched.email && formikEmail.errors.email}
              />
              <Button type="submit">Change email</Button>
            </Stack>
          </Form>
        </FormikProvider>
        <List>
          <ProfileList label="Change password">
            <FormikProvider value={formikPassword}>
              <Form autoComplete="off" noValidate onSubmit={formikPassword.handleSubmit}>
                <Stack spacing={2} my={2}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Current password"
                    {...formikPassword.getFieldProps('cPassword')}
                    error={Boolean(
                      formikPassword.touched.cPassword && formikPassword.errors.cPassword
                    )}
                    helperText={formikPassword.touched.cPassword && formikPassword.errors.cPassword}
                  />
                  <TextField
                    fullWidth
                    type="password"
                    label="New password"
                    {...formikPassword.getFieldProps('nPassword')}
                    error={Boolean(
                      formikPassword.touched.nPassword && formikPassword.errors.nPassword
                    )}
                    helperText={formikPassword.touched.nPassword && formikPassword.errors.nPassword}
                  />
                  <Button type="submit">Change password</Button>
                </Stack>
              </Form>
            </FormikProvider>
          </ProfileList>
        </List>
      </Stack>
    </>
  );
};

export default Profile;
