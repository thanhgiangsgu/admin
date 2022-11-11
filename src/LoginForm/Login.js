import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route, useNavigate }  from 'react-router-dom'
import Signup from './Signup'
import { useState } from 'react';
import axios from 'axios';
import Templates from '../pages/Templates';
import toast from 'react-hot-toast'

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [user, setUser] = useState(initialState)
  const [users, setUsers] = useState([])
  const {email, password, err, success} = user
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataLogin = {
      email: email,
      password: password,
    }
    console.log(dataLogin);
    const res = await axios.post('http://localhost:3002/account/login', dataLogin)
    
    if (res.data.check == 'true')
    {
      toast.success('Dang nhap thanh cong')
      return(
        navigate('/admin/overview')
    ) 
    }
    else 
    {
      toast.error("Sai mat khau hoac email")
    }


  };

  

  const handleChangeInput = e => {
    const  {name, value} = e.target
    setUser({...user, [name]:value, err:'', success:''})
    console.log(user);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange = {handleChangeInput}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange = {handleChangeInput}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick = {handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      
    </ThemeProvider>

    
  );

      <Routes>
        <Route path="/sign-up" element={<Signup />}></Route>
      </Routes>
}