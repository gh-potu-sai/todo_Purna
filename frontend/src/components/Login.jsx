import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../services/api';
import '../styles.css';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    const { username, password } = form;
    let isValid = true;
    const newErrors = { username: '', password: '' };

    if (username.trim().length < 3 || /\s/.test(username)) {
      newErrors.username = 'Username must be at least 3 characters with no spaces.';
      isValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 6 characters with uppercase, lowercase, and number.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const res = await axios.post('/auth/login', form);
      if (res.data === 'Login successful') {
        localStorage.setItem('user', JSON.stringify({ username: form.username }));
        toast.success(` Welcome, ${form.username}!`);
        navigate('/tasks');
      } else {
        toast.error(`❌ ${res.data}`);
      }
    } catch (err) {
      toast.error('❌ Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">Login to Your Account</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="auth-input"
            required
          />
          {errors.username && <p className="error-text">{errors.username}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="auth-input"
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword" style={{ marginLeft: '8px' }}>
            Show Password
          </label>
        </div>

        <button type="submit" className="auth-button">Login</button>
      </form>
      <p className="switch-link">
        Don't have an account? <Link to="/register" className="login-link">Register</Link>
      </p>
    </div>
  );
};

export default Login;
