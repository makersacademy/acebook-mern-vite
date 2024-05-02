import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import ScorePage from "../../src/pages/Score/ScorePage";
import '@testing-library/jest-dom';



test('retrieves data from local storage', () => {
    localStorage.setItem('genreID', '116');
    localStorage.setItem('score', '300');
    localStorage.setItem('bonus', '50');

    render(
        <Router>
            <ScorePage />
        </Router>
    );

    expect(screen.getByText('Round Score: 300')).to.exist;
    expect(screen.getByText('Perfect Round Bonus: 0')).to.exist;
    expect(screen.getByText('Speed Bonus: 50')).to.exist;
    expect(screen.getByText('Your Score: 350')).to.exist;
})

test('retrieves data from local storage and displays a rating', () => {
    localStorage.setItem('genreID', '132');
    localStorage.setItem('score', '0');
    localStorage.setItem('bonus', '0');

    render(
        <Router>
            <ScorePage />
        </Router>
    );

    expect(screen.getByText('Round Score: 0')).to.exist;
    expect(screen.getByText('Perfect Round Bonus: 0')).to.exist;
    expect(screen.getByText('Speed Bonus: 0')).to.exist;
    expect(screen.getByText('Your Score: 0')).to.exist;
    expect(screen.getByText('Do you even moonwalk?')).to.exist;
})

test('handles empty localStorage', () => {
    localStorage.clear();
    render(
        <Router>
            <ScorePage />
        </Router>
    );
    
    expect(screen.getByText("Round Score:")).toBeInTheDocument();
    expect(screen.getByText(/Perfect Round Bonus: 0/)).toBeInTheDocument();
    expect(screen.getByText("Speed Bonus:")).toBeInTheDocument();
    expect(screen.getByText(/Your Score: 0/)).toBeInTheDocument();
    expect(screen.getByText(/Default rating message/)).toBeInTheDocument();
});