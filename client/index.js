import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// import {CLIENT_ID,CLIENT_SECRET } from '../env';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
