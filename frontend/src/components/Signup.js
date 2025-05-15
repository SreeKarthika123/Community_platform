// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Signup() {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Replace with your backend API URL
//     const res = await fetch('http://localhost:5000/api/auth/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       alert('Signup successful!');
//       navigate('/signin');
//     } else {
//       const error = await res.json();
//       alert(error.message || 'Signup failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
//         <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
//         <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
//         <button type="submit">Signup</button>
//       </form>
//       <p>Already have an account? <button onClick={() => navigate('/signin')}>Sign In</button></p>
//     </div>
//   );
// }

// export default Signup;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Signup() {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('http://localhost:5000/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         alert('Signup successful!');
//         localStorage.setItem('token', data.token);  // Store token
//         navigate('/signin');  // Redirect to signin page
//       } else {
//         const errorData = await res.json();
//         alert(errorData.message || 'Signup failed');  // Show error message
//       }
//     } catch (err) {
//       alert('An error occurred: ' + err.message);  // Handle network errors
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
//         <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
//         <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
//         <button type="submit">Signup</button>
//       </form>
//       <p>Already have an account? <button onClick={() => navigate('/signin')}>Sign In</button></p>
//     </div>
//   );
// }

// export default Signup;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Signup() {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Get the token from localStorage (if any, for example purposes)
//     const token = localStorage.getItem('token'); 

//     try {
//       const res = await fetch('http://localhost:5000/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : '',  // Add the Bearer token if available
//         },
//         body: JSON.stringify(form),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         alert('Signup successful!');
//         localStorage.setItem('token', data.token);  // Store the token received after signup
//         navigate('/signin');  // Redirect to signin page
//       } else {
//         const errorData = await res.json();
//         alert(errorData.message || 'Signup failed');
//       }
//     } catch (err) {
//       alert('An error occurred: ' + err.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
//         <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
//         <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
//         <button type="submit">Signup</button>
//       </form>
//       <p>Already have an account? <button onClick={() => navigate('/signin')}>Sign In</button></p>
//     </div>
//   );
// }

// export default Signup;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        alert('Signup successful!');
        localStorage.setItem('token', data.token);
        navigate('/signin');
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Signup failed');
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
          <img src="/girll.webp" alt="Signup visual" style={styles.image} />
        </div>
        <div style={styles.right}>
          <h2 style={styles.heading}>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
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
            <button type="submit" style={styles.button}>Sign Up</button>
          </form>
          <p style={styles.smallText}>
            Already have an account?{' '}
            <button onClick={() => navigate('/signin')} style={styles.linkBtn}>
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
