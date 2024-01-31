/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import {expect} from '@vitest/expect'
import Navbar from '../../src/components/NavBar/navbar.jsx';

describe('Navbar', () => {
  test('renders navbar with correct items', () => {

    render(<Navbar />);

    const testingElement = screen.queryByTestId('navbar');
    if (testingElement === null) {
      throw new Error("Testing element was not found");}

    const navbarItems = ['Home', 'Logout', 'User'];
    navbarItems.forEach(item => {
    const testingElement = screen.queryByText(item);
    if (testingElement === null) {
      throw new Error("Testing element was not found");}
    });
  });
});


