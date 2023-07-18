import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import HHC from '/home/ronagen/projects/GB02/client/containers/HomeHeaderContainer.jsx';

test('renders the landing page', () => {
  render(<HHC />);
  console.log('yes');
});