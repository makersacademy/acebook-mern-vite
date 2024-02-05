/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {render, screen} from '@testing-library/react'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom'
import Navbar from '../../src/components/NavBar/navbar.jsx';


test('renders navbar with correct items', () => {

  render(<Navbar />, {wrapper: BrowserRouter})

  expect(screen.getByTestId('navbar')).toBeInTheDocument()
  expect(screen.getByRole('button', {name: /home/i})).toBeInTheDocument()
  expect(screen.getByRole('button', {name: /login/i})).toBeInTheDocument()
  expect(screen.getByRole('heading', {name: /ab/i})).toBeInTheDocument()
  expect(screen.getByTestId('searchItem')).toBeInTheDocument()

});





