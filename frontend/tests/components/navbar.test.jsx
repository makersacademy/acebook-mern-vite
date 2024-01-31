/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../../src/components/NavBar/navbar.jsx';

describe('Navbar', () => {
  test('renders navbar with correct items', () => {

    render(<Navbar />);

    const navbarContainer = screen.getByTestId('navbar');
    expect(navbarContainer).toBeInTheDocument();

    const navbarItems = ['Home', 'Logout', 'User'];
    navbarItems.forEach(item => {
      const linkElement = screen.getByText(item);
      expect(linkElement).toBeInTheDocument();
    });
  });
});



