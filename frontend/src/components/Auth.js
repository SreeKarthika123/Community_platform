import React, { useState } from 'react';
import API from '../api/api';

function Auth({ setToken }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post(`/auth/${isSignup ? 'signup' : 'signin'}`, form);
      setToken(res.data.token);
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div>
      <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input name="name" placeholder="Name" onChange={handleChange} required />
        )}
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button type="submit">{isSignup ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account?' : 'Need an account?'}
      </button>
    </div>
  );
}

export default Auth;
