import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({ username: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    const { username, password, confirmPassword } = form;
    const newErrors = { username: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (username.trim().length < 3 || /\s/.test(username)) {
      newErrors.username = 'Username must be at least 3 characters with no spaces.';
      isValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 6 characters with uppercase, lowercase, and number.';
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const res = await axios.post('/auth/register', {
        username: form.username,
        password: form.password,
      });
      if (res.data === 'User registered successfully') {
        toast.success('✅ Registered successfully!');
        navigate('/');
      } else {
        toast.warning(`⚠️ ${res.data}`);
      }
    } catch (err) {
      toast.error('❌ Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const { password } = form;
    if (password.length < 6) return 'Weak';
    if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)) return 'Strong';
    return 'Moderate';
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">Create Your Account</h2>
      <form onSubmit={handleRegister} className="auth-form">

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
            placeholder="Create a strong password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="auth-input"
            required
          />
          {form.password && (
            <small style={{ color: getPasswordStrength() === 'Strong' ? 'green' : 'orange' }}>
              Strength: {getPasswordStrength()}
            </small>
          )}
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            className="auth-input"
            required
          />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
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

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="switch-link">
        Already have an account? <Link to="/" className="login-link">Login</Link>
      </p>
    </div>
  );
};

export default Register;
