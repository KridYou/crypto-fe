// components/Login.tsx
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, TextField, Typography, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', data);
      localStorage.setItem('authToken', response.data.token);
      router.push('/portfolio'); // Redirect to portfolio or another page
    } catch (error: any) {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
