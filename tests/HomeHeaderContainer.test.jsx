/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'
import { HomeHeaderContainer } from '../client/containers/HomeHeaderContainer.jsx';

test('renders the landing page', () => {
  const test = render(<HomeHeaderContainer />);
  expect(test.getByText("Cohort: CTRI 17")).toBeTruthy();
  console.log('yes');
});