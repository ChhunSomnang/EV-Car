'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type FormData = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    if (message === 'Login successful!') {
      setTimeout(() => {
        router.push('/');
      }, 500);
    }
  }, [message, router]);

  const onSubmit = async (data: FormData) => {
    setMessage('');

    try {
      const response = await axios.post(
        'https://inventoryapi-367404119922.asia-southeast1.run.app/User/Login',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*',
          },
        }
      );

      console.log('Login Response:', response.data);

      // Assuming API returns a token or user data
      if (response.data) {
        localStorage.setItem('token', response.data); // Store token
        setMessage('Login successful!');
      } else {
        setMessage('Invalid credentials');
      }
    } catch (error: any) {
      console.error('Login Error:', error.response?.data);
      setMessage(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {message && (
        <p className={`text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Username:</label>
          <input
            {...register('username', { required: 'Username is required' })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Password:</label>
          <input
            {...register('password', { required: 'Password is required' })}
            type="password"
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
