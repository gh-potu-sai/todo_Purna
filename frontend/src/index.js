import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// ✅ Suppress ResizeObserver loop error (non-breaking Chrome warning)
const originalError = console.error;
console.error = (...args) => {
    if (
        typeof args[0] === 'string' &&
        args[0].includes('ResizeObserver loop completed')
    ) {
        return;
    }
    originalError(...args);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
