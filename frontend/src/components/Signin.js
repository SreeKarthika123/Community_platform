// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Signin({ setToken }) {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch('http://localhost:5000/api/auth/signin', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       setToken(data.token);
//       navigate('/communities');
//     } else {
//       alert(data.message || 'Signin failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Sign In</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
//         <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
//         <button type="submit">Sign In</button>
//       </form>
//       <p>Don't have an account? <button onClick={() => navigate('/signup')}>Sign Up</button></p>
//     </div>
//   );
// }

// export default Signin;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin({ setToken }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/v1/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        const token = data.token;
        localStorage.setItem('token', token);
        if (setToken) setToken(token);
        navigate('/communities');
      } else {
        alert(data.message || 'Signin failed');
      }
    } catch (err) {
      alert('An error occurred: ' + err.message);
    }
  };

  const styles = {
    outer: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #6a11cb 0%, #f7797d 100%)',
      fontFamily: 'Arial, sans-serif',
    },
    card: {
      width: '900px',
      display: 'flex',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      borderRadius: '10px',
      overflow: 'hidden',
      background: '#fff',
    },
    left: {
      flex: '1',
      background: '#fafafa',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    right: {
      flex: '1',
      padding: '50px 40px',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '18px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '12px',
      background: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    smallText: {
      textAlign: 'center',
      marginTop: '15px',
      fontSize: '14px',
    },
    linkBtn: {
      background: 'none',
      border: 'none',
      color: '#007bff',
      cursor: 'pointer',
      textDecoration: 'underline',
      fontSize: '14px',
      padding: '0',
    },
  };

  return (
    <div style={styles.outer}>
      <div style={styles.card}>
        <div style={styles.left}>
          <img src="/girll.webp" alt="Signin visual" style={styles.image} />
        </div>
        <div style={styles.right}>
          <h2 style={styles.heading}>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>Sign In</button>
          </form>

          <p style={styles.smallText}>
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} style={styles.linkBtn}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
